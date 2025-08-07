import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  phonenumber: String,
  student: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
