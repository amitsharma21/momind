import mongoose from "mongoose";

const audioCategorySchema = mongoose.Schema({
  title: { type: String, required: true },
});

export default mongoose.model("AudioCategory", audioCategorySchema);
