import mongoose from "mongoose";

const audioSchema = mongoose.Schema({
  name: { type: String, required: true },
  audio: { type: String, required: true, default: "" },
  thumbnail: { type: String, required: true, default: "" },
  isPremium: { type: Boolean, required: true },
  subCategory: { type: String, required: true },
});

export default mongoose.model("Audio", audioSchema);
