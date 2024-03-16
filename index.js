const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv")
const instructorRoutes = require("./routes/Instructor")
const courseRoutes = require("./routes/Course")
const userRoutes = require("./routes/User")
dotenv.config()
const app = express();
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors())
app.use('/instructors', instructorRoutes)
app.use('/courses', courseRoutes)
app.use('/users', userRoutes)
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5006
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
  )
  .catch((err) => console.log(err));
