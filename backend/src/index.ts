import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import routerUsers from './users/users';


export const app = express();
export const prisma = new PrismaClient()
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

app.use('/users', routerUsers);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});