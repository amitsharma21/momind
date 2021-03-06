import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgmail from "@sendgrid/mail";
import dotenv from "dotenv";

import Admin from "../models/admin.js";
import User from "../models/user.js";

dotenv.config();

sgmail.setApiKey(process.env.SENDGRID_API_KEY);
//sigining in admin
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin)
      return res.status(400).json({ message: "Invalid Email Address" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id },
      "test",
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: existingAdmin, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

//sign up the admin
export const signup = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    //checking whether user already present or not
    const existingAdmin = await Admin.findOne({ email });

    //if user is present we are not moving forward and send the error to the frontend
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 12 /*salt number*/);

    //entering the details of the user into the database
    const result = await Admin.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    //generating the token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      /* at 2nd argument position we need to enter the secret string */ "test",
      { expiresIn: "1d" }
    );

    //sending back the details of the created user
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//deactivate or reactivate  the given user
export const toggleUserStatus = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await User.find({ email: email });
    const status = result[0].isActive;
    const id = result[0]._id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive: !status },
      { new: true }
    );
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//send email
export const sendEmail = async (req, res) => {
  try {
    const { email, emailSubject, emailDescription } = req.body;
    const message = {
      to: email,
      from: "amitsharma@ideausher.com",
      subject: emailSubject,
      text: emailDescription,
    };
    sgmail
      .send(message)
      .then((response) => {
        res.status(200).json({ message: "Action Performed successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "something went wrong" });
      });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
