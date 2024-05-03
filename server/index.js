const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
require("dotenv").config();
const database = require("./config/database.js");
const cookieParser = require("cookie-parser");
// for the integration of the frontend and backend
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary.js");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;

// database connection
database.connect();

// middleware
app.use(express.json());
app.use(cookieParser);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    // createParentPath:true
  })
);

// cloudinary Connect
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// default route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the default Route of the API",
  });
});
