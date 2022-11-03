import express from "express";
import router from "./router";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", router);
app.use("/user", createNewUser);
app.use("/signin", signIn);

app.get("/", (req, res) => {
  res.status(200);
  res.json({
    message: "***_Welcome to the REST API with Prisma ORM and PostreSQL_***",
  });
});

export default app;
