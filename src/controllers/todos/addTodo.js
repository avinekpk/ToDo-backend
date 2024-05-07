import Projects from "../../models/projects.js";
import ToDos from "../../models/todos.js";

const addTodoList = async (req, res) => {
  const { projectId } = req.params;
  const { todo } = req.body;

  try {
    const project = await Projects.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    if (todo) {
      const newTodo = new ToDos({ description: todo });
      const savedTodo = await newTodo.save();
      project.todos.push(savedTodo._id);
      await project.save();
      console.log("Todo list added successfully");
      res.status(201).json({ message: "Todo added", todo: savedTodo });
    } else {
      res.status(400).json({ message: "Please provide a todo item" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default addTodoList;
