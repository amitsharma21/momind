import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

//---------------------------------------sign in using simple form for user-----------------------------
export const signin = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    let existingUser = await User.findOne({ phoneNumber });

    if (!existingUser)
      return res
        .status(400)
        .json({ message: "No user found with given phone Number" });

    //creating jwt token
    const token = jwt.sign(
      { phoneNumber: existingUser.phoneNumber, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "45d" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//------------------------------------------sign up for user using form-------------------------------
export const signup = async (req, res) => {
  const { name, phoneNumber, referralCode } = req.body;

  try {
    //checking whether user already present or not
    const existingUserWithPhoneNumber = await User.findOne({ phoneNumber });

    //if user is present we are not moving forward and send the error to the frontend
    if (existingUserWithPhoneNumber)
      return res.status(400).json({
        message: "User already exists with given phone number",
      });

    //entering the details of the user into the database
    const result = await User.create({
      name,
      phoneNumber,
      referralCode,
    });

    //generating the token
    const token = jwt.sign(
      { phoneNumber: result.phoneNumber, id: result._id },
      /* at 2nd argument position we need to enter the secret string */
      process.env.JWT_SECRET_KEY,
      { expiresIn: "45d" }
    );

    //sending back the details of the created user
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//----------------------------------fetching All the users inside database----------------------------
export const fetchAll = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//--------------------fetching single user it require user id as an input-----------------------------
export const fetchSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//------------------------forget password generating otp--------------------------------------------------
export const generateOtp = async (req, res) => {
  const { phoneNumber, channel } = req.body;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: phoneNumber, channel: channel })
    .then((verification) => {
      res.status(200).json({ status: verification.status });
    })
    .catch((error) => {
      res.status(404).json({ message: "unsuccessfull" });
    });
};

//----------------------------forget password verify otp----------------------------------------------
export const verifyOtp = async (req, res) => {
  const { phoneNumber, code } = req.body;
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: phoneNumber, code: code })
    .then((verification_check) => {
      console.log(verification_check.status);
      res.status(200).json({ status: verification_check.status });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ message: "unsuccessfull" });
    });
};

//----------------------------change Name---------------------------------
export const changeName = async (req, res) => {
  const { id } = req.params;
  try {
    const { name } = req.body;
    const result = await User.findOneAndUpdate(
      { _id: id },
      { name: name },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-------------------------change email--------------------------
export const changeEmail = async (req, res) => {
  const { id } = req.params;
  try {
    const { email } = req.body;
    const result = await User.findOneAndUpdate(
      { _id: id },
      { email: email },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//-----------------------change password -------------------------
export const changePassword = async (req, res) => {
  const { id } = req.params;
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12 /*salt number*/);
    const result = await User.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
