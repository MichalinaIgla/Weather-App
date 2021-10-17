export interface Widgets {
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
    mode: boolean,
    widgets: {  
      weather: boolean,
      airQuality: boolean,
      favPlaces: boolean,
      sunrise: boolean,
      sunset: boolean,
      moonrise: boolean,
      moonset: boolean,
    }, 
  },
}