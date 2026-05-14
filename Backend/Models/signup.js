import mongoose from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
import { tokenForUser } from "../Services/AuthenticateToken.js";

const SignupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["normal", "user", "admin"],
    default: "normal",
  }
}, { timeStamps: true });

SignupSchema.pre('save', function () {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(10).toString("hex");
  const hashPassword = createHmac('sha256', salt).update(user.password).digest("hex");
  user.salt = salt;
  user.password = hashPassword;
});

SignupSchema.static("matchPasswordAndCreateToken", async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (!user) throw Error("User not found")

  const hashPass = createHmac("sha256", user.salt).update(password).digest("hex");
  if (user.password !== hashPass) {
    throw Error("User password incorrent");
  };

  const token = tokenForUser(user);
  return token;
});

const User = mongoose.model("User", SignupSchema);
export default User;