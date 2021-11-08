import PillBox from "../models/pillBox.js";

//creating the Plan
export const createPillBox = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { name, routineType, routineTime, weekDays, monthDates } = req.body;
    const result = await PillBox.create({
      author: req.userId,
      name,
      routineType,
      routineTime,
      weekDays,
      monthDates,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetch all pillBox
export const fetchAllPillBox = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const result = await PillBox.find({ author: req.userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetch single pillBox
export const fetchSinglePillBox = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const { id } = req.params;
    const result = await PillBox.findById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong!" });
  }
};

//delete single pillBox
export const deletePillBox = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const { id } = req.params;
    const result = await PillBox.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
