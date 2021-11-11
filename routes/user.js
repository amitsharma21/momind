import express from "express";
import fileUpload from "express-fileupload";

import {
  signup,
  signin,
  fetchAll,
  fetchSingle,
  generateOtp,
  verifyOtp,
  changeName,
  changeEmail,
  changePhoneNumber,
  uploadProfilePicture,
} from "../controllers/user.js";
import signupMiddleware from "../middleware/signup.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

//auth
router.post("/signup", signup);
router.post("/signin", signin);

//fetching user
router.get("/fetchall", fetchAll); //change this to the fetch
router.get("/fetchsingle/:id", fetchSingle); //fetchsingle/:id to fetch/:id

//signup otp verification
router.post("/generatesignupotp", signupMiddleware, generateOtp);
//normal otp generation
router.post("/generateotp", generateOtp);
router.post("/verifyotp", verifyOtp);

//updating profile
router.patch("/changename", userAuth, changeName);
router.patch("/changeemail", userAuth, changeEmail);
router.patch("/changephonenumber", userAuth, changePhoneNumber);
router.patch("/profilepic", userAuth, uploadProfilePicture);

export default router;
