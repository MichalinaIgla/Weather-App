const moongoose = require("mongoose");

const Widgets = moongoose.Schema({
  name: String,
  weather: {
    x: Number,
    y: Number,
  },
  airQuality: {
    x: Number,
    y: Number,
  },
  favPlaces: {
    x: Number,
    y: Number,
  },
  astro: {
    sunrise: {
      x: Number,
      y: Number,
    },
    sunset: {
      x: Number,
      y: Number,
    },
    moonset: {
      x: Number,
      y: Number,
    },
    moonrise: {
      x: Number,
      y: Number,
    }
  },
  editMode: {
    mode: Boolean,
    widgets: {  
      weather: Boolean,
      airQuality: Boolean,
      favPlaces: Boolean,
      sunrise: Boolean,
      sunset: Boolean,
      moonrise: Boolean,
      moonset: Boolean,
    }, 
  },

});

module.exports = moongoose.model('Widgets', Widgets);
