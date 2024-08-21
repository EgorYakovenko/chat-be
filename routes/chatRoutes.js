import {
  getChats,
  createChat,
  updateChat,
  deleteChat,
  sendMessage,
} from "../controllers/chatController.js";
import express from "express";
const router = express.Router();

router.get("/chats", getChats);
router.post("/chats", createChat);
router.put("/chats/:id", updateChat);
router.delete("/chats/:id", deleteChat);
router.post("/chats/:id/messages", sendMessage);

export default router;
