import express, { Express, json } from "express";
import cors from "cors";
import petsRoutes from "../routes/pets";
import { connectDB } from '../database/config';

const PETS_PATH = "/api/pet";

export class Server {
  app: Express;
  port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT);
    connectDB();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(json());
  }

  routes() {
    this.app.use(PETS_PATH, petsRoutes);

    this.app.get("/", (req, res) => {
      res.json({
        ok: true,
        message: "This is working as expected!",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Server running on port", this.port)
    );
  }
}
