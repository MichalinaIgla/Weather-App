import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWidgets } from "../api/widgets";
import { postWidgets } from "../api/widgets";
import { deleteWidgets } from "../api/widgets";
import { Widgets } from "../types/Widgets";
export const fetchWidgets = createAsyncThunk("widgets/fetchWidgets", async () => {
  const response = await getWidgets();
  return response;
});

export const addWidgets = createAsyncThunk(
  "widgets/addWidgets",
  async (newArrangement: Widgets) => {
    const response = await postWidgets(newArrangement);
    return response;
  }
);
export const removeWidgets = createAsyncThunk("widgets/removeWidgets", async (id: string) => {
  deleteWidgets(id);
  return id;
});

const initialState = {
  data: [
    {
      _id: 0,
      name: "Default Arragment",
      weather: { x: 10, y: 10 },
      airQuality: { x: 10, y: 10 },
      favPlaces: { x: 10, y: 10 },
      astro: {
        sunrise: { x: 10, y: 10 },
        sunset: { x: 10, y: 10 },
        moonset: { x: 10, y: 10 },
        moonrise: { x: 10, y: 10 },
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
  ],
};

export const widgetsSlice = createSlice({
  name: "widgtes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWidgets.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchWidgets.pending, (state, action) => {});
    builder.addCase(fetchWidgets.rejected, (state, action) => {
      state = initialState;
    });

    builder.addCase(addWidgets.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(addWidgets.rejected, (state, action) => {
      console.log("addWidgets rejected");
    });

    builder.addCase(removeWidgets.fulfilled, (state, action) => {
      state.data = state.data.filter((el) => el._id.toString() !== action.payload);
    });
    builder.addCase(removeWidgets.rejected, (state, action) => {
      console.log("removeWidgets rejected");
    });
  },
});

export default widgetsSlice.reducer;
