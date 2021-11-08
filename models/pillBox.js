import mongoose from "mongoose";

const pillBoxSchema = mongoose.Schema({
  author: { type: String, required: true },
  name: { type: String, required: true },
  routineType: { type: String, default: "Weekly" },
  routineTime: { type: [String], default: [] },
  weekDays: { type: [Number], default: [] },
  monthDates: { type: [Date], default: [] },
});

export default mongoose.model("PillBox", pillBoxSchema);
