import { weatherApiClient } from "./client";

export const getPollution = async (lat: number, lng: number) => {
  return await weatherApiClient
    .get(
      `/air_pollution?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
