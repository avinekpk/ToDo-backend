import Users from "../../models/users.js";

const getAllProjects = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await Users.findById(userId).populate({
      path: "projects",
      populate: {
        path: "todos",
        model: "ToDos",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = user.projects;

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "Empty: No projects found" });
    }

    res.status(200).json({ projects });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default getAllProjects;
