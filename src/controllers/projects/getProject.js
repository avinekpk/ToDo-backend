import Projects from "../../models/projects.js";

const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Projects.findById(projectId).populate({
      path: "todos",
      model: "ToDos",
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let total = 0;
    let completed = 0;

    project.todos.forEach((todo) => {
      total++;
      if (todo.status === true) {
        completed++;
      }
    });

    const summary = `${completed}/${total} todos completed`;
    // Create a new object that includes the project and summary
    const projectWithSummary = { ...project._doc, summary };

    res.status(200).json({ project: projectWithSummary });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default getProject;
