import Affirmation from "../models/affirmation.js";

//creating the affirmation it takes the affirmation and date in its body and author inside authorization
export const createAffirmation = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { affirmation, date } = req.body;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    //finding all the affirmation of given user
    const AllAffirmations = await Affirmation.find({ author: req.userId });
    //checking whether the user has affirmation in given month and year
    const ExistingAffirmation = AllAffirmations.filter((singleAffirmation) => {
      if (
        singleAffirmation.date.getMonth() === month &&
        singleAffirmation.date.getFullYear() === year &&
        singleAffirmation.date.getDate() === day
      )
        return true;
      else return false;
    });
    //this statement create new life affirmation  and it run only when given user dont have lifestatement in given month and year
    if (ExistingAffirmation.length === 0) {
      const result = await Affirmation.create({
        date,
        affirmation,
        author: req.userId,
      });
      return res.status(200).json(result);
    } else {
      const id = ExistingAffirmation[0]._id;
      const result = await Affirmation.findByIdAndUpdate(
        id,
        { date, affirmation },
        { new: true }
      );
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching affirmation for given month and year and day
export const fetchAffirmation = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const { givendate } = req.params;
    const date = new Date(givendate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const AllAffirmations = await Affirmation.find({ author: req.userId });
    const ExistingAffirmation = AllAffirmations.filter((singleAffirmation) => {
      if (
        singleAffirmation.date.getMonth() === month &&
        singleAffirmation.date.getFullYear() === year &&
        singleAffirmation.date.getDate() == day
      )
        return true;
      else return false;
    });
    if (ExistingAffirmation.length > 0) {
      return res.status(200).json(ExistingAffirmation[0]);
    } else {
      return res.status(200).json({ message: "Add new Affirmation" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
