import userModel from "../Model/user.model.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(404).send("No User with such email found");

    const isValid = user.password === password;
    if (!isValid) return res.status(400).send("Invalid password");

    const payload = { id: user.id, email: email };

    const accessToken = jwt.sign(payload, "SecretKey", { expiresIn: "10m" });

    res.status(200).json({ token: accessToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error while logging in" });
  }
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const isValid = await userModel.findOne({ email });
    if (isValid) return res.status(400).send("User with email exists");

    const newUser = new userModel({
      name,
      email,
      password,
    });
    await newUser.save();

    const payload = { id: newUser.id, email: email };

    const accessToken = jwt.sign(payload, "SecretKey", { expiresIn: "10m" });

    res.status(200).json({ token: accessToken });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while creating new user" || err.message });
  }
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, "SecretKey", (err, user) => {
    if (err) res.status(403).json({ message: "Invalid token" });
    req.userId = user.id;
    next();
  });
}
