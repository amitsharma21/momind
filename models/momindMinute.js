import mongoose from "mongoose";

const momindMinuteSchema = mongoose.Schema({
  sequenceNumber: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("MomindMinute", momindMinuteSchema);
