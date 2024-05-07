import Users from "../../models/users.js";
import Projects from "../../models/projects.js";

const addProject = async (req, res) => {
  const { title } = req.body;
  const userId = req.userId;

  if (!title) {
    res.status(400).json({ message: "Title is mandatory" });
    return;
  }

  const user = await Users.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const newProject = new Projects({
    title,
    todos: [],
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
