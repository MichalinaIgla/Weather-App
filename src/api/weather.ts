import { weatherApiClient, geoApiClient } from "./client";

export const getWeather = async (lat: number, lng: number) => {
  return await weatherApiClient
    .get(
      `/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=alerts,minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCityName = async (lat: number, lng: number) => {
  return await geoApiClient
    .get(
      `/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCoords = async (cityName: string) => {
  return await geoApiClient
    .get(
      `/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
