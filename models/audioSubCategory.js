import mongoose from "mongoose";

const audioSubCategorySchema = mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  categoryId: { type: String, required: true },
});

export default mongoose.model("AudioSubCategory", audioSubCategorySchema);
