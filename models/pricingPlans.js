import mongoose from "mongoose";

const pricingPlansSchema = mongoose.Schema({
  benefits: { type: [String], required: true, default: [] },
  plansDetail: { type: [{}], required: true, default: [] },
});

export default mongoose.model("PricingPlan", pricingPlansSchema);
