import mongoose from "mongoose";

const guidedMeditationSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  thumbnail: { type: String, required: false },
  audioTracks: { type: [String], default: [], required: true },
  videoTracks: { type: [String], default: [], required: true },
  category: { type: String, required: true },
  plan: { type: String },
});

export default mongoose.model("GuidedMeditation", guidedMeditationSchema);
