import mongoose from "mongoose";

const guidedMeditationSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: false },
  audioTracks: { type: [String], default: [], required: false },
  videoTracks: { type: [String], default: [], required: false },
  files: { type: [String], default: [], required: false },
  category: { type: String, required: true },
  premium: { type: Boolean, required: true, default: false },
});

export default mongoose.model("GuidedMeditation", guidedMeditationSchema);
