import { Router, Request, Response } from "express";
import { prisma } from "../index";
import bcrypt from "bcryptjs";

interface User {
  email: string;
  password: string;
}

const routerUsers = Router();

routerUsers.get("/", async (_req, res) => {
  try {
    const users: User[] = await prisma.user.findMany();
    res.send(JSON.stringify(users));
  } catch (error: any) {
    res.send(JSON.stringify(error));
  }
});

routerUsers.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;
    const salt: string = bcrypt.genSaltSync(10);
    const hashPassword: string = bcrypt.hashSync(password, salt);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });
    res.send(JSON.stringify(user));
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).send("Email already exists");
    } else {
      res.send(JSON.stringify(error));
    }
  }
});

routerUsers.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        res.send(JSON.stringify(user));
      } else {
        res.status(400).send("Invalid password");
      }
    } else {
      res.status(400).send("User not found");
    }
  } catch (error: any) {
    res.send(JSON.stringify(error));
  }
});

routerUsers.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.send(JSON.stringify(user));
  } catch (error: any) {
    res.send(JSON.stringify(error));
  }
});

export default routerUsers;
