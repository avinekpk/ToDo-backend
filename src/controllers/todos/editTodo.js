import ToDos from "../../models/todos.js";

const updateTodoList = async (req, res) => {
  const { todoId } = req.params;
  const { description } = req.body;

  try {
    const todo = await ToDos.findById(todoId);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    if (description) {
      todo.description = description;
      const updatedTodo = await todo.save();
      res.json({ message: "Todo updated successfully", todo: updatedTodo });
    } else {
      res
        .status(400)
        .json({ message: "Please provide a new description for the todo" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default updateTodoList;
