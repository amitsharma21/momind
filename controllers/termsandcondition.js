import TermsAndCondition from "../models/termsandcondition.js";

//creating the terms and conditions it takes tac as an argument
export const createTermsAndConditions = async (req, res) => {
  try {
    const { tac } = req.body;
    const result = await TermsAndCondition.create({ tac });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching terms and conditions
export const fetchTermsAndConditions = async (req, res) => {
  try {
    const result = await TermsAndCondition.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//update the terms and conditions

export const updateTermsAndConditions = async (req, res) => {
  try {
    const { ckEditorData } = req.body;
    const result = await TermsAndCondition.find({});
    console.log(result[0]._id);
    const updatedTac = await TermsAndCondition.findByIdAndUpdate(
      result[0]._id,
      { tac: ckEditorData },
      { new: true }
    );
    res.status(200).json(updatedTac);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
