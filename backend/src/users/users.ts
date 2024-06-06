import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../index";

interface User {
  email: string;
  password: string;
}

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", this.getAllUsers);
    this.router.post("/register", this.registerUser);
    this.router.post("/login", this.loginUser);
    this.router.get("/:id", this.getUserById);
  }

  private async getAllUsers(req: Request, res: Response) {
    try {
      const users: User[] = await prisma.user.findMany();
      res.json(users);
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  private async registerUser(req: Request, res: Response) {
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
      res.json(user);
    } catch (error: any) {
      if (error.code === "P2002") {
        res.status(400).send("Email already exists");
      } else {
        res.status(500).json(error);
      }
    }
  }

  private async loginUser(req: Request, res: Response) {
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
          res.json(user);
        } else {
          res.status(400).send("Invalid password");
        }
      } else {
        res.status(400).send("User not found");
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  private async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      res.json(user);
    } catch (error: any) {
      res.status(500).json(error);
    }
  }
}

export default new UserRouter().router;
