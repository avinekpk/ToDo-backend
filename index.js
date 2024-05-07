import express from "express";
import { config } from "dotenv";
import connectDb from "./src/config/dbConnection.js";
import authRoutes from "./src/routes/auth.js";
import projectRoutes from "./src/routes/projects.js";
import todoRoutes from "./src/routes/todos.js";
import { apiLogger } from "./src/middlewares/apiLogger.js";

config();
connectDb();

const app = express();
app.use(apiLogger);
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/", authRoutes);
app.use("/", projectRoutes);
app.use("/", todoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
