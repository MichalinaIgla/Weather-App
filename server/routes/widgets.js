const express = require("express");
const router = express.Router();
const Widgets = require("../models/Widgets");
const mongodb = require("mongodb");

router.get("/", (req, res) => {
  Widgets.find()
    .then((data) => {
      console.log("Successfully found Widgets");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.post("/", (req, res) => {
  const { name, weather, airQuality, favPlaces, astro, editMode } = req.body;
  console.log(editMode);

  const widgets = new Widgets({
    ...req.body
  });
  widgets
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.delete("/:widgetsId", (req, res) => {
  console.log(req.params.widgetsId);
  Widgets.deleteOne({ _id: new mongodb.ObjectID(req.params.widgetsId) })
    .then((data) => {
      res.json({ ...data, message: "Successfully removed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.patch("/:widgetsId", (req, res) => {
  console.log(req.params.widgetsId);
  const { name, weather, airQuality, favPlaces, astro } = req.body;
  Widgets.updateOne(
    { _id: new mongodb.ObjectID(req.params.widgetsId) },
    {
      $set: {
        name,
        weather,
        airQuality,
        favPlaces,
        astro,
      },
    }
  )
    .then((data) => {
      res.json(data);
      console.log("Successfully updated");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

module.exports = router;
