import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("SubCategory", subCategorySchema);
