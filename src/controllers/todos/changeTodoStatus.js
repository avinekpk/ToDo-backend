import ToDos from "../../models/todos.js";

const changeTodoStatus = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await ToDos.findById(todoId);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    // Toggle the status of the todo item
    todo.status = !todo.status;
    await todo.save();

    console.log("Todo status changed successfully");
    res.status(200).json({ message: "Todo status changed", todo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default changeTodoStatus;
