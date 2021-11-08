import mongoose from "mongoose";

const weeklyPlansSchema = mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  plans: { type: [String], required: true },
});

export default mongoose.model("WeeklyPlans", weeklyPlansSchema);
