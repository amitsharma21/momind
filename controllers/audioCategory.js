import AudioCategory from "../models/audioCategory.js";

//creating the Audio category
export const createAudioCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await AudioCategory.create({ title });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching all the Audio Categories
export const fetchAllAudioCategories = async (req, res) => {
  try {
    const result = await AudioCategory.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching single Audio category
export const fetchSingleAudioCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AudioCategory.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updating the Category it takes the id of Category
export const updateAudioCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const result = await AudioCategory.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleting the Category it takes the id of Category---------------->needs update
export const deleteAudioCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AudioCategory.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
