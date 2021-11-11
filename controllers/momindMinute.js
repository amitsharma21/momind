import MomindMinute from "../models/momindMinute.js";

//creating the momind Minute
export const createMomindMinute = async (req, res) => {
  try {
    const { title, description } = req.body;
    const allMomindMinutes = await MomindMinute.find();
    let lastSequenceNumber = 0;
    for (var i = 0; i < allMomindMinutes.length; i++) {
      if (allMomindMinutes[i].sequenceNumber > lastSequenceNumber) {
        lastSequenceNumber = allMomindMinutes[i].sequenceNumber;
      }
    }
    const result = await MomindMinute.create({
      sequenceNumber: lastSequenceNumber + 1,
      title,
      description,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//fetching all the momind minutes
export const fetchAllMomindMinute = async (req, res) => {
  try {
    const result = await MomindMinute.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//fetching single momind minute it takes id as param
export const fetchSingleMomindMinute = async (req, res) => {
  try {
    const { sequencenumber } = req.params;
    const result = await MomindMinute.find({ sequenceNumber: sequencenumber });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update the momind minute it takes the id of mm as param
export const updateMomindMinute = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await MomindMinute.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//deleting the momind minute it takes the id of mm as param
export const deleteMomindMinute = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MomindMinute.findByIdAndDelete(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
