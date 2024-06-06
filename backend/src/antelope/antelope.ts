import { Router, Request, Response } from "express";
import axios from "axios";
import { prisma } from "../index";

interface Antelope {
  name: string;
  continent: string;
  weight: number;
  height: number;
  horns: string;
  picture: string;
}

class AntelopeRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllAntelopes);
    this.router.get("/collection/:userid", this.getUserAntelopes);
    this.router.post("/collection/:userid", this.addAntelopesToCollection);
    this.router.delete(
      "/collection/:userid",
      this.deleteAntelopesFromCollection
    );
  }

  private async getAllAntelopes(req: Request, res: Response): Promise<void> {
    try {
      const url =
        "https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json";
      const response = await axios.get<Antelope[]>(url);
      res.json(response.data);
    } catch (error) {
      console.error("Failed to fetch antelopes:", error);
      res.status(500).json({ error: "Failed to fetch antelopes" });
    }
  }

  private async getUserAntelopes(req: Request, res: Response): Promise<void> {
    const { userid } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userid },
        include: { antelopes: true },
      });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      res.json(user.antelopes);
    } catch (error) {
      console.error("Error fetching user's antelopes:", error);
      res.status(500).json({ error: "Failed to fetch user's antelopes" });
    }
  }

  private async addAntelopesToCollection(
    req: Request,
    res: Response
  ): Promise<void> {
    const { userid } = req.params;
    const { antelopes: antelopeNames } = req.body as { antelopes: string[] };
    try {
      const user = await prisma.user.findUnique({
        where: { id: userid },
      });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const url =
        "https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json";
      const { data: allAntelopes } = await axios.get<Antelope[]>(url);
      const antelopesToSave = allAntelopes.filter((antelope) =>
        antelopeNames.includes(antelope.name)
      );

      const results = await Promise.all(
        antelopesToSave.map(async (antelope) => {
          const existingAntelope = await prisma.antelope.findFirst({
            where: {
              name: antelope.name,
              userId: userid,
            },
          });

          if (!existingAntelope) {
            return await prisma.antelope.create({
              data: {
                name: antelope.name,
                continent: antelope.continent,
                weight: antelope.weight,
                height: antelope.height,
                horns: antelope.horns,
                picture: antelope.picture,
                user: {
                  connect: { id: userid },
                },
              },
            });
          }
          return existingAntelope;
        })
      );

      res.json({ message: "Processed antelopes.", data: results });
    } catch (error) {
      console.error("Error adding antelopes to collection:", error);
      res.status(500).json({ error: "Failed to add antelopes to collection" });
    }
  }

  private async deleteAntelopesFromCollection(
    req: Request,
    res: Response
  ): Promise<void> {
    const { userid } = req.params;
    const { antelopes: antelopeNames } = req.body as { antelopes: string[] };

    try {
      const user = await prisma.user.findUnique({
        where: { id: userid },
        include: { antelopes: true },
      });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const antelopesToDelete = user.antelopes.filter((antelope) =>
        antelopeNames.includes(antelope.name)
      );

      const deleteResults = await Promise.all(
        antelopesToDelete.map(async (antelope) => {
          return await prisma.antelope.delete({
            where: { id: antelope.id },
          });
        })
      );

      res.json({
        message: "Deleted specified antelopes from user's collection.",
        data: deleteResults,
      });
    } catch (error) {
      console.error("Error deleting user's antelopes:", error);
      res.status(500).json({ error: "Failed to delete user's antelopes" });
    }
  }
}

export default new AntelopeRouter().router;
