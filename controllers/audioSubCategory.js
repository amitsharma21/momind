import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import AudioSubCategory from "../models/audioSubCategory.js";

//creating the Audio Sub category
export const createAudioSubCategory = async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    const thumbnail = req.files.thumbnail;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName =
      new Date().getTime().toString() + path.extname(thumbnail.name);

    //checking file size
    if (thumbnail.truncated) throw new Error("File size is too big");

    //checking file type
    if (
      thumbnail.mimetype !== "image/png" &&
      thumbnail.mimetype !== "image/jpg" &&
      thumbnail.mimetype !== "image/jpeg"
    )
      throw new Error("File type not supported");
    // saving file to the folder
    const savePath = path.join(
      __dirname,
      "../public/images/audioSubCategories",
      fileName
    );
    await thumbnail.mv(savePath);

    const result = await AudioSubCategory.create({
      title,
      categoryId,
      thumbnail: fileName,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching all the Audio Categories
export const fetchAllAudioSubCategories = async (req, res) => {
  try {
    const result = await AudioSubCategory.find();
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/audioSubCategories",
        fileName
      );
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching single Audio category
export const fetchSingleAudioSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AudioSubCategory.findById(id);
    const fileName = result.thumbnail;
    result.thumbnail = path.join(
      process.env.BASIC_ROUTE,
      "images/audioSubCategories",
      fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updating the Category it takes the id of Category-------------->thumbnail update remaining
export const updateAudioSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const result = await AudioSubCategory.findByIdAndUpdate(
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
export const deleteAudioSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await AudioSubCategory.findByIdAndDelete(id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fileName = result.thumbnail;
    const pathToFile = path.join(
      __dirname,
      "../public/images/audioSubCategories",
      fileName
    );

    fs.unlinkSync(pathToFile);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
