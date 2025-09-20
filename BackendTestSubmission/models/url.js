import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  source: { type: String },
  location: { type: String }
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  creationDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  clicks: [clickSchema]
});

export default mongoose.model("Url", urlSchema);
