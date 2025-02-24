const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoConnection = require("./helps/dbConfig");

// routes
const authRoutes = require("./routes/auth.js");
const channelRoutes = require("./routes/channels.js");
const videoRoutes = require("./routes/videos.js");
const uploadRoutes = require("./routes/uploads.js");
const commentRoutes = require("./routes/comments.js");

const app = express();
dotenv.config();

const PORT = process.env.SERVER_PORT || 5001;

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// static files(manually creating folder locally for upload video,image).
app.use(express.static("assets"));
app.use("/api/medias/banners", express.static(__dirname + "/assets/banners"));
app.use("/api/medias/profiles", express.static(__dirname + "/assets/profiles"));
app.use("/api/medias/covers", express.static(__dirname + "/assets/covers"));
app.use("/api/medias/videos", express.static(__dirname + "/assets/videos"));

// routes
app.use("/api/auth", authRoutes);
app.use("/videos", commentRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/uploads", uploadRoutes);

app.listen(PORT, () => {
  mongoConnection();
  console.log("Server is on Port: ",PORT);
});
