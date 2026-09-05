import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/analytics", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Node API running on port 5000"));
