import axios from "axios";

export const weatherApiClient = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
});

export const widgetsApiClient = axios.create({
  baseURL: "http://localhost:4000/widgets", //for now, .env changes to port 3000
});

export const geoApiClient = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL_GEO,
});
