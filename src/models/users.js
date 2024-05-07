import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add user name"],
    },
    email: {
      type: String,
      required: [true, "Please add user email"],
      unique: [true, "Email id already registered"],
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
    },
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'Projects'
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema);
