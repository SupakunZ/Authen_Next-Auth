import mongoose from "mongoose";

//Model
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;