import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

import Audio from "../models/audio.js";
import SubCategory from "../models/audioSubCategory.js";
import User from "../models/user.js";

dotenv.config();

//-------------------------------------------creating the Audio---------------------------------------
export const createAudio = async (req, res) => {
  try {
    const file = req.files.audioFile;
    const thumbnail = req.files.thumbnail;
    const { name, isPremium, subCategory } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileName = new Date().getTime().toString() + path.extname(file.name); //for music
    const thumbnailName =
      new Date().getTime().toString() + path.extname(thumbnail.name); //for thumbnail

    //checking file size
    if (file.truncated) throw new Error("song size is too big");
    if (thumbnail.truncated) throw new Error("thumbnail size is too big");

    //checking file type
    if (file.mimetype !== "audio/mp3" && file.mimetype !== "audio/mpeg")
      throw new Error("File type not supported");
    if (
      thumbnail.mimetype !== "image/png" &&
      thumbnail.mimetype !== "image/jpg" &&
      thumbnail.mimetype !== "image/jpeg"
    )
      throw new Error("thumbnail type not supported");

    // saving file to the folder
    const savePath = path.join(__dirname, "../public/audio", fileName);
    await file.mv(savePath);

    const thumbnailPath = path.join(
      __dirname,
      "../public/images/audio",
      thumbnailName
    );
    await thumbnail.mv(thumbnailPath);

    //saving data to the database
    const result = await Audio.create({
      name,
      audio: fileName,
      thumbnail: thumbnailName,
      isPremium: true,
      subCategory,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------stream audio---------------------------------------------------
export const streamAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Audio.findById(id);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const range = req.headers.range;
    const audioPath = path.join(__dirname, "../public/audio", result.audio);
    const audioSize = fs.statSync(audioPath).size;

    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, audioSize - 1);

    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audioSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mp3",
    };
    res.writeHead(206, headers);

    const stream = fs.createReadStream(audioPath, { start, end });
    stream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------get all the music list--------------------------------------------
export const fetchAllAudio = async (req, res) => {
  try {
    const result = await Audio.find();
    //returning the url of thumbnail
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/audio",
        fileName
      );
      return single;
    });
    //returning the url of audio
    result.map((single) => {
      const fileName = single.audio;
      single.audio = path.join(process.env.BASIC_ROUTE, "audio", fileName);
      return single;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//---------------------------------------get single audio data--------------------------------------------
export const fetchSingleAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Audio.findById(id);
    let fileName = result.thumbnail;
    result.thumbnail = path.join(
      process.env.BASIC_ROUTE,
      "images/audio",
      fileName
    );
    fileName = result.audio;
    result.audio = path.join(process.env.BASIC_ROUTE, "audio", fileName);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------------------------------------delete the Audio----------------------------------
export const deleteAudio = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Audio.findByIdAndDelete(id);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //deleting the audio file from folder
    if (result.audio !== "") {
      const audio = result.audio;
      const pathToAudio = path.join(__dirname, "../public/audio", audio);

      fs.unlinkSync(pathToAudio);
    }

    //deleting the thumbnail from the folder
    if (result.thumbnail !== "") {
      const thumbnail = result.thumbnail;
      const pathToThumbnail = path.join(
        __dirname,
        "../public/images/audio",
        thumbnail
      );

      fs.unlinkSync(pathToThumbnail);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------------add to favourite----------------------------------
export const addToFavourite = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.body; //here we are getting the music id that we want to add to favourite inside body
    const result = await User.findById(req.userId);
    result.musicFavourite.push(id); //pushing music to favourite
    const updatedResult = await User.findByIdAndUpdate(req.userId, result, {
      new: true,
    });
    res.status(500).json(updatedResult);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//-------------------------fetch favourite songs------------------------
export const fetchFavourites = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const user = await User.findById(req.userId);
    const result = await Music.find({ _id: { $in: user.musicFavourite } });
    result.map((single) => {
      const fileName = single.thumbnail;
      single.thumbnail = path.join(
        process.env.BASIC_ROUTE,
        "images/music",
        fileName
      );
      return single;
    });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//-----------------------remove from favouorite music------------------------
export const removeFromFavourite = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(404).json({ message: "user is not authenticated" });
    const { id } = req.body; //here we are getting the music id that we want to remove from favourite inside body
    const user = await User.findById(req.userId);

    const array = user.musicFavourite.filter((single) => single !== id);

    const result = await User.findByIdAndUpdate(
      req.userId,
      { musicFavourite: array },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
