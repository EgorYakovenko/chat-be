import axios from "axios";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";

export const getChats = async (req, res) => {
  const chats = await Chat.find().populate("messages");
  res.json(chats);
};

export const createChat = async (req, res) => {
  const { firstName, lastName } = req.body;
  const newChat = new Chat({ firstName, lastName });
  await newChat.save();
  res.json(newChat);
};

export const updateChat = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { firstName, lastName },
    { new: true }
  );
  res.json(updatedChat);
};

export const deleteChat = async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.json({ message: "Chat deleted" });
};

export const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { text, sender } = req.body;
  const message = new Message({ chatId: id, text, sender });
  await message.save();

  const chat = await Chat.findById(id);
  chat.messages.push(message._id);
  await chat.save();

  setTimeout(async () => {
    const quote = await axios.get("https://api.quotable.io/random");
    const autoMessage = new Message({
      chatId: id,
      text: quote.data.content,
      sender: "AutoBot",
    });
    await autoMessage.save();

    chat.messages.push(autoMessage._id);
    await chat.save();

    res.io.emit("newMessage", { chatId: id, message: autoMessage });
  }, 3000);

  res.json(message);
};
