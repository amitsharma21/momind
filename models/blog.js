import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true, default: ["tag1", "tag2"] },
  image: { type: String, required: true },
  body: { type: {}, required: true, default: { a: "aakak" } },
});

export default mongoose.model("Blog", blogSchema);
