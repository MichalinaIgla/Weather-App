import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    lat: "51.509865",
    lng: "-0.118092",
    name: "London, GB",
  },
  {
    id: 1,
    lat: "51.753981757816746",
    lng: "19.45603662523837",
    name: "Łódź, PL",
  },
];

export const favouritePlacesSlice = createSlice({
  name: "favouritePlaces",
  initialState,
  reducers: {
    toggleFavPlace(state, action) {
      const id = (Math.random() + 1).toString(36).substring(7)
      const found = state.find(el => el.lng === action.payload.lng && el.lat === action.payload.lat);
      if (found) {
        return state.filter((el) =>  el.lng !== action.payload.lng && el.lat !== action.payload.lat)
      } else {
        state.push({ id, ...action.payload });
      }
    },
  },
});

export default favouritePlacesSlice.reducer;
export const { toggleFavPlace } = favouritePlacesSlice.actions;