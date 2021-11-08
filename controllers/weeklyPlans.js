import WeeklyPlans from "../models/weeklyPlans.js";

//creating the Plan
export const createPlan = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { plans } = req.body;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    //finding all the affirmation of given user
    const AllPlans = await WeeklyPlans.find({ author: req.userId });
    //checking whether the user has affirmation in given month and year
    const ExistingPlans = AllPlans.filter((singlePlan) => {
      if (
        singlePlan.date.getMonth() === month &&
        singlePlan.date.getFullYear() === year &&
        singlePlan.date.getDate() === day
      )
        return true;
      else return false;
    });
    //this statement create new life affirmation  and it run only when given user dont have lifestatement in given month and year
    if (ExistingPlans.length === 0) {
      const result = await WeeklyPlans.create({
        date,
        plans,
        author: req.userId,
      });
      return res.status(200).json(result);
    } else {
      const id = ExistingPlans[0]._id;
      const result = await WeeklyPlans.findByIdAndUpdate(
        id,
        { date, plans },
        { new: true }
      );
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching plan for given day
export const fetchPlan = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const { givendate } = req.params;
    const date = new Date(givendate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const AllPlans = await WeeklyPlans.find({ author: req.userId });
    const ExistingPlans = AllPlans.filter((singlePlan) => {
      if (
        singlePlan.date.getMonth() === month &&
        singlePlan.date.getFullYear() === year &&
        singlePlan.date.getDate() == day
      )
        return true;
      else return false;
    });
    if (ExistingPlans.length > 0) {
      return res.status(200).json(ExistingPlans[0]);
    } else {
      return res.status(200).json({ message: "Add new Plan" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetch plans for given week
export const fetchWeekPlans = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const { givendate } = req.params;
    const date = new Date(givendate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
