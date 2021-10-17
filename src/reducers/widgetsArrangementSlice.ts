import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    weather: { x: 100, y: 10 },
    airQuality: { x: window.innerWidth - 300, y: 0 },
    favPlaces: { x: 160, y: -260 },
    astro: {
      sunrise: { x: window.innerWidth - 550, y: 150 },
      sunset: { x: window.innerWidth - 300, y: 70 },
      moonrise: { x: window.innerWidth - 550, y: 80 },
      moonset: { x: window.innerWidth - 300, y: 0 },
    },
    editMode: {
      mode: false,
      widgets: {
        weather: true,
        airQuality: true,
        favPlaces: true,
        sunrise: true,
        sunset: true,
        moonrise: true,
        moonset: true,
      },
    },
  },
};

export const widgetsArrangementSlice = createSlice({
  name: "widgtesArrangement",
  initialState,
  reducers: {
    setWidgetArragment: (state, action) => {
      state.data = action.payload;
    },
    changeEditMode: (state) => {
      state.data.editMode.mode = !state.data.editMode.mode;
    },
    changeVisibility: (state, action) => {
      state.data.editMode.widgets = {...state.data.editMode.widgets, ...action.payload};
    },
  },
});

export default widgetsArrangementSlice.reducer;
export const { setWidgetArragment, changeEditMode, changeVisibility } =
  widgetsArrangementSlice.actions;
