import Projects from "../../models/projects.js";
import ToDos from "../../models/todos.js";

const editProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, completedTodos } = req.body;

  try {
    const project = await Projects.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    if (title) {
      project.title = title;
    }

    if (completedTodos && completedTodos.length > 0) {
      // Iterate over the completed todos array and update their status
      for (const todoId of completedTodos) {
        const todo = await ToDos.findById(todoId);
        if (todo) {
          todo.status = true;
          await todo.save();
        }
      }
    }

    const updatedProject = await project.save();
    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default editProject;
