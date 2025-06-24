import { login, register } from "../Controller/user.controller.js";

export function userRoutes(app) {
  app.post("/auth/login", login);
  app.post("/auth/register", register);
}
