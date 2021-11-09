import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phoneNumber: { type: Number, required: true },
  profilePicture: { type: String, required: false },
  isActive: { type: Boolean, default: true },
  referralCode: { type: String, required: false },
  musicFavourite: { type: [String], default: [] },
  guidedMeditationFavourite: { type: [String], default: [] },
});

export default mongoose.model("User", userSchema);
