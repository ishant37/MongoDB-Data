import express, { Router } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes.js";
import privateRoutes from "./routes/private.routes.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});
app.use(express.json());

app.use("/auth", authRoutes)
app.use("/private", privateRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});




//!authnticate krna h
//