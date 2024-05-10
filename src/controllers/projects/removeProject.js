import Projects from "../../models/projects.js";
import ToDos from "../../models/todos.js";

const removeProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find the project
    const project = await Projects.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Retrieve the list of todos associated with the project
    const todosToDelete = project.todos;

    await ToDos.deleteMany({ _id: { $in: todosToDelete } });
    await Projects.findByIdAndDelete(projectId);

    console.log("Project and associated todos deleted successfully");

    res.json({ message: "Project deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default removeProject;
