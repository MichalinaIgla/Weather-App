const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const widgetsRoutes = require("./routes/widgets");

app.use("/widgets", widgetsRoutes);

app.get("/", (req, res) => {
  res.send("We are on home");
});

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
