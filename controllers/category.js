import Category from "../models/category.js";

//creating the category it takes "title" and "description" as a req body
export const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await Category.create({ title, description });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching all the Categories
export const fetchAllCategories = async (req, res) => {
  try {
    const result = await Category.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching single category
export const fetchSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updating the Category it takes the id of Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await Category.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleting the Category it takes the id of Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
