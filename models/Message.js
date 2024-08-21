import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: "Chat" },
  text: { type: String, required: true },
  sender: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message = model("Message", MessageSchema);
