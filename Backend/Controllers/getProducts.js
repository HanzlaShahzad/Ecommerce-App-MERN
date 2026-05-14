import User from "../Models/signup.js";

export async function getUsers(req, res) {
  const user = await User.find({});
  return res.json({ user });
};
