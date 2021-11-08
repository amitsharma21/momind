import mongoose from "mongoose";

const lifeStatementSchema = mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  statement: { type: String, required: true },
});

export default mongoose.model("LifeStatement", lifeStatementSchema);
