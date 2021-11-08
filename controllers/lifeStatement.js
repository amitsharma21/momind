import LifeStatement from "../models/lifeStatement.js";

//creating the lifestatement it takes the statement and date in its body and author inside authorization
export const createLifeStatement = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { statement, date } = req.body;
    const year = date.getFullYear();
    const month = date.getMonth();
    //finding all the statements of given user
    const AllStatements = await LifeStatement.find({ author: req.userId });
    //checking whether the user has statement in given month and year
    const ExistingStatement = AllStatements.filter((singleStatement) => {
      if (
        singleStatement.date.getMonth() === month &&
        singleStatement.date.getFullYear() === year
      )
        return true;
      else return false;
    });
    //this statement create new life statement  and it run only when given user dont have lifestatement in given month and year
    if (ExistingStatement.length === 0) {
      const result = await LifeStatement.create({
        date,
        statement,
        author: req.userId,
      });
      return res.status(200).json(result);
    } else {
      const id = ExistingStatement[0]._id;
      const result = await LifeStatement.findByIdAndUpdate(
        id,
        { date, statement },
        { new: true }
      );
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching life statement for given month and year
export const fetchLifeStatement = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "user is not authenticated" });
    }
    const { givendate } = req.params;
    const date = new Date(givendate);
    const year = date.getFullYear();
    const month = date.getMonth();

    const AllStatements = await LifeStatement.find({ author: req.userId });
    const ExistingStatement = AllStatements.filter((singleStatement) => {
      if (
        singleStatement.date.getMonth() === month &&
        singleStatement.date.getFullYear() === year
      )
        return true;
      else return false;
    });
    if (ExistingStatement.length > 0) {
      return res.status(200).json(ExistingStatement[0]);
    } else {
      return res.status(200).json({ message: "Add Life Statement" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
