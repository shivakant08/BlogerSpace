const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comments")

app.use(cors());
const corsOptions = {
  origin: "*",
  credential: true,
};

app.use(cors(corsOptions));

//Middlewares
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
console.log(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

//Upload Image
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, images);
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Images Uploaded Successfully");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Succesfully");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App listening on port " + process.env.PORT);
});
