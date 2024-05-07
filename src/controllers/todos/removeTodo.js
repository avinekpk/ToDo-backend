import Projects from "../../models/projects.js";
import ToDos from "../../models/todos.js";

const removeTodo = async (req, res) => {
  const { projectId, todoId } = req.params;

  try {
    const project = await Projects.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Find the index of the todo ID in the project's todos array
    const todoIndex = project.todos.indexOf(todoId);
    if (todoIndex === -1) {
      res.status(404).json({ message: "Todo not found in the project" });
      return;
    }

    // Remove the todo ID from the project's todos array
    project.todos.splice(todoIndex, 1);

    // Remove the todo from the Todos collection
    await ToDos.findByIdAndDelete(todoId);

    // Save the updated project
    await project.save();
    console.log("Todo removed successfully from project and Todos collection");

    res.json({
      message: "ToDo deleted",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default removeTodo;
