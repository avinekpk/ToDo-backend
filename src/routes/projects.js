import express from "express";
import getAllProjects from "../controllers/projects/getAllProjects.js";
import addProject from "../controllers/projects/addProject.js";
import getProject from "../controllers/projects/getProject.js";
import removeProject from "../controllers/projects/removeProject.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/projects", verifyToken, getAllProjects);
router.post("/project", verifyToken, addProject);
router.get("/project/:projectId", verifyToken, getProject);
router.delete("/project/:projectId", verifyToken, removeProject);

export default router;
