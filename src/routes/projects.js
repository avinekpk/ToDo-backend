import express from "express";
import getAllProjects from "../controllers/projects/getAllProjects.js";
import addProject from "../controllers/projects/addProject.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/projects", verifyToken, getAllProjects);
router.post("/project", verifyToken, addProject);

export default router;
