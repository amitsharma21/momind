import mongoose from "mongoose";

const affirmationSchema = mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  affirmation: { type: [String], required: true },
});

export default mongoose.model("Affirmation", affirmationSchema);
