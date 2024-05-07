import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ToDos", todoSchema);
