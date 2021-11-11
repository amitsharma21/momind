import PricingPlan from "../models/pricingPlans.js";

//creating the pricing Plan
export const createPricingPlan = async (req, res) => {
  try {
    const result = await PricingPlan.create({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching all the pricing Plans
export const fetchPricingPlan = async (req, res) => {
  try {
    const result = await PricingPlan.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updating the Pricing Plan
export const updatePricingPlan = async (req, res) => {
  try {
    const updatedPricingPlan = req.body;
    const initialPricingPlan = await PricingPlan.find();
    const id = initialPricingPlan[0]._id;
    const result = await PricingPlan.findByIdAndUpdate(id, updatedPricingPlan, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add the new Pricing Plan
export const addPricingPlan = async (req, res) => {
  try {
    const newPlan = req.body;
    newPlan.key = new Date();
    const initialPricings = await PricingPlan.find();
    const id = initialPricings[0]._id;
    initialPricings[0].plansDetail.push(newPlan);
    console.log(initialPricings);
    const result = await PricingPlan.findByIdAndUpdate(id, initialPricings[0], {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
