import SubCategory from "../models/subCategory.js";

//creating the sub category it takes "title" and "description" as a req body
export const createSubCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await SubCategory.create({ title, description });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching all the Sub Categories
export const fetchAllSubCategories = async (req, res) => {
  try {
    const result = await SubCategory.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching single sub category
export const fetchSingleSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SubCategory.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updating the Category it takes the id of Category
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await SubCategory.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleting the sub Category it takes the id of Category
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SubCategory.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
