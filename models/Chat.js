import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

export const Chat = model("Chat", ChatSchema);
