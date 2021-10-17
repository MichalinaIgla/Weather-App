import { responsiveFontSizes } from "@material-ui/core";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather, getCityName } from "../api/weather";

export const fetchWeather = createAsyncThunk(
  "posts/fetchWeather",
  async (data: any) => {
    const { lat, lng, isText } = data;
    const response = await getWeather(lat, lng);
    let exists = false;
    let name = await getCityName(lat, lng);
    if (name === undefined || name.length === 0) {
      name = [
        {
          country: "NF",
          name: "Not Found",
        },
      ];
    }

    response.name = name[0];
    response.isText = isText != undefined ? true : false;
    const retrieved = localStorage.getItem("History");
    if (localStorage["History"]) {
      let retrievedArray = retrieved !== null ? JSON.parse(retrieved) : [];

      for (let i = 0; i < retrievedArray.length; i++) {
        if (retrievedArray[i].name == name[0].name) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        if (retrievedArray.length < 5) {
          retrievedArray.push({
            country: response.name.country,
            name: response.name.name,
          });
        } else {
          retrievedArray.shift();
          retrievedArray.push({
            country: response.name.country,
            name: response.name.name,
          });
        }
      }

      localStorage.setItem("History", JSON.stringify(retrievedArray));
    } else {
      localStorage.setItem(
        "History",
        JSON.stringify([
          {
            country: response.name.country,
            name: response.name.name,
          },
        ])
      );
    }

    return response;
  }
);
const initialState = {
  data: {},
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchWeather.pending, (state, action) => {});
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.data = [];
    });
  },
});

// export const {} = weatherSlice.actions;

export default weatherSlice.reducer;
export const weatherSelector = (state: any) =>
  state.rootReducers.weatherReducer;
