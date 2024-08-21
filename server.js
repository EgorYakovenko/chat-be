import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.io = io;
  next();
});
const PORT = 5000;
app.use("/api", chatRoutes);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    server.listen(PORT, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
