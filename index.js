import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import faqRoutes from "./routes/faq.js";
import contactusRoutes from "./routes/contactus.js";
import termsAndConditionsRoutes from "./routes/termsandcondition.js";
import privacyPolicyRoutes from "./routes/privacypolicy.js";
import feelingRoutes from "./routes/feeling.js";
import blogRoutes from "./routes/blog.js";
import musicRoutes from "./routes/music.js";
import videoRoutes from "./routes/video.js";
import motivationRoutes from "./routes/motivation.js";
import guidedMeditationRoutes from "./routes/guidedMeditation.js";
import categoryRoutes from "./routes/category.js";
import lifeStatementRoutes from "./routes/lifeStatement.js";
import affirmationRoutes from "./routes/affirmation.js";
import weeklyPlansRoutes from "./routes/weeklyPlans.js";
import pillBoxRoutes from "./routes/pillBox.js";
import momindMinuteRoutes from "./routes/momindMinute.js";

const app = express();
app.use(express.static("public"));
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//dashboard routes
app.use("/admin", adminRoutes);
//normal user routes
app.use("/user", userRoutes);
//faq route
app.use("/faq", faqRoutes);
//contactus route
app.use("/contactus", contactusRoutes);
//terms and condition route
app.use("/tac", termsAndConditionsRoutes);
//privacy policy route
app.use("/privacypolicy", privacyPolicyRoutes);
//feeling route
app.use("/feeling", feelingRoutes);
//blog route
app.use("/blog", blogRoutes);
//music route
app.use("/music", musicRoutes);
//video route
app.use("/video", videoRoutes);
//motivation route
app.use("/motivation", motivationRoutes);
//session route
app.use("/guidedmeditation", guidedMeditationRoutes);
//category
app.use("/category", categoryRoutes);
//lifestatement
app.use("/lifestatement", lifeStatementRoutes);
//affirmation
app.use("/affirmation", affirmationRoutes);
//weekly plans
app.use("/weeklyplan", weeklyPlansRoutes);
//pillBox
app.use("/pillbox", pillBoxRoutes);
//momindMinute
app.use("/momindminute", momindMinuteRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the momind API version 1.0");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
