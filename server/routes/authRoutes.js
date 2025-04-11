import express from "express";
const Router = express.Router();
import { login, register ,getCurrentUser } from "../controllers/authController.js";
Router.post("/register", register);
Router.post("/login", login);
Router.get("/currentuser", getCurrentUser);
export default Router;
