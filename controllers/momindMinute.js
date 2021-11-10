import MomindMinute from "../models/momindMinute.js";

//creating the momind Minute
export const createMomindMinute = async (req, res) => {
  try {
    const { title, description } = req.body;
    const lastMomindMinute = MomindMinute.findOne(
      {},
      { sort: { $natural: -1 } }
    );
    console.log(lastMomindMinute);
    const result = await MomindMinute.create({
      sequenceNumber: lastMomindMinute.sequenceNumber + 1,
      title,
      description,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching all the momind minutes
export const fetchAllMomindMinute = async (req, res) => {
  try {
    const result = await MomindMinute.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//fetching single momind minute it takes id as param
export const fetchSingleMomindMinute = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MomindMinute.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//deleting the momind minute it takes the id of mm as param
export const deleteMomindMinute = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MomindMinute.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};
