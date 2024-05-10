import Users from "../../models/users.js";
import Projects from "../../models/projects.js";
import ToDos from "../../models/todos.js";

const addProject = async (req, res) => {
  const { title, todo } = req.body;
  const userId = req.userId;

  if (!title) {
    res.status(400).json({ message: "Please add a title" });
    return;
  }
  if (!todo || todo.length === 0) {
    res.status(400).json({ message: "Add at least 1 todo" });
    return;
  }

  const user = await Users.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const todos = await Promise.all(
    todo.map(async (todoItem) => {
      const newTodo = new ToDos({ description: todoItem });
      const savedTodo = await newTodo.save();
      return savedTodo._id;
    })
  );

  const newProject = new Projects({
    title,
    todos,
  });

  try {
    const savedProject = await newProject.save();

    user.projects.push(savedProject._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Project created successfully", project: savedProject });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default addProject;
