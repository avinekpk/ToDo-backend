import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add project title"],
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "ToDos",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Projects", projectSchema);
