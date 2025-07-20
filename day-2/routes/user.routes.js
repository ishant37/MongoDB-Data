import express from "express";
import { login, logout, signup } from "../controllers/user.controller.js";

const router = express.Router();    


// Sample route for user registration
router.post("/signup", signup);
// Sample route for user login
router.post("/login", login);
// Sample route for user logout
router.post("/logout", logout);

        

export default router;