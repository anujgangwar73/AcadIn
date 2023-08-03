const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());

const authRoutes = require("./routes/Auth");
const userRoutes = require("./routes/Users");
const postRoutes = require("./routes/Posts");
const conversationRoute = require("./routes/Conversation");
const messageRoute = require("./routes/Messenger");
if(process.env.NODE_ENV !== 'test') {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Error connecting to database", err));
}

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "public/images");
        },
        filename: (req, file, cb) => {
          cb(null, req.body.name);
        },
      });
      
      const upload = multer({ storage: storage });
      app.post("/upload", upload.single("file"), (req, res) => {
        try {
          return res.status(200).json("File uploded successfully");
        } catch (error) {
          console.error(error);
        }
});
app.get("/image.png", (req, res) => {
  res.sendFile(path.join(__dirname, "public/images/1648699165442Snap city.png"));
});
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

// app.listen(process.env.PORT, () => {
//     console.log(`Backend server started on port ${process.env.PORT}`);
// });

module.exports = app;