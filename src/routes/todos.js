import express from "express";
import addTodo from "../controllers/todos/addTodo.js";
import editTodo from "../controllers/todos/editTodo.js";
import removeTodo from "../controllers/todos/removeTodo.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/todos/:projectId", verifyToken, addTodo);
router.put("/todos/:todoId", verifyToken, editTodo);
router.delete("/todos/:todoId/:projectId", verifyToken, removeTodo);


export default router;
