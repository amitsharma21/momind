import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import faqRoutes from "./routes/faq.js";
import contactusRoutes from "./routes/contactus.js";
import termsAndConditionsRoutes from "./routes/termsandcondition.js";
import privacyPolicyRoutes from "./routes/privacypolicy.js";
import feelingRoutes from "./routes/feeling.js";
import blogRoutes from "./routes/blog.js";
import audioRoutes from "./routes/audio.js";
import musicRoutes from "./routes/music.js";
import videoRoutes from "./routes/video.js";
import motivationRoutes from "./routes/motivation.js";
import guidedMeditationRoutes from "./routes/guidedMeditation.js";
import categoryRoutes from "./routes/category.js";
import subCategoryRoutes from "./routes/subCategory.js";
import audioCategoryRoutes from "./routes/audioCategory.js";
import audioSubCategoryRoutes from "./routes/audioSubCategory.js";
import lifeStatementRoutes from "./routes/lifeStatement.js";
import affirmationRoutes from "./routes/affirmation.js";
import weeklyPlansRoutes from "./routes/weeklyPlans.js";
import pillBoxRoutes from "./routes/pillBox.js";
import momindMinuteRoutes from "./routes/momindMinute.js";
import pricingPlanRoutes from "./routes/pricingPlans.js";

const app = express();
app.use(express.static("public"));
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Momind Api",
      version: "1.0.0",
      description: "This is documentation of Momind API's",
    },
    servers: [{ url: "http://localhost:5000" }],
  },

  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
//audio route
app.use("/audio", audioRoutes);
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
//sub category
app.use("/subcategory", subCategoryRoutes);
//audio category
app.use("/audiocategory", audioCategoryRoutes);
//audio subcategory
app.use("/audiosubcategory", audioSubCategoryRoutes);
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
//pricingPlans
app.use("/pricingplan", pricingPlanRoutes);
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
