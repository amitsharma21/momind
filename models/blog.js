import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true, default: ["tag1", "tag2"] },
  image: { type: String, required: true, default: "" },
  body: { type: {}, required: true, default: { a: "aakak" } },
  creationDate: { type: Date, required: true },
  updateDate: { type: Date, required: true },
  active: { type: Boolean, required: true, default: true },
});

export default mongoose.model("Blog", blogSchema);
