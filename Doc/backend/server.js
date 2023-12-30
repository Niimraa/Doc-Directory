require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const apptRoutes = require("./routes/appointmentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const articleRoutes = require("./routes/articleRoutes");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/doctorCURD", doctorRoutes);
app.use("/patientCURD", patientRoutes);
app.use("/reviewCURD", reviewRoutes);
app.use("/apptCURD", apptRoutes);
app.use("/availabilityCURD", availabilityRoutes);
app.use("/articles", articleRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // we only start to listening for request when the database has successfully connected.
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
