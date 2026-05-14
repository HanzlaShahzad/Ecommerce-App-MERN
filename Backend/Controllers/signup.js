import User from "../Models/signup.js";
import { tokenForUser } from "../Services/AuthenticateToken.js";

export async function Signup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.create({
      fullName: fullName,
      email: email,
      password: password,
    });

    const token = tokenForUser(user);
    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err });
  }
};

export async function Signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const token = await User.matchPasswordAndCreateToken({ email, password });
    if (!token) return res.json({ msg: "user not found" });
    return res.status(200).json({ user, token });

  } catch (error) {
    console.log("signinError", error)
    return res.status(404).json({ error: error });
  }
};