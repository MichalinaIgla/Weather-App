import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPollution } from "../api/pollution";
import { Pollution } from "../types/Pollution";
export const fetchPollution = createAsyncThunk(
  "posts/fetchPollution",
  async (data: any) => {
    const { lat, lng } = data;
    const response = await getPollution(lat, lng);
    return response;
  }
);
const initialState: Pollution = {
  data: {
    main: {
      aqi: 0,
    },
    dt: 0,
    components: {
      co: 0,
      no: 0,
      no2: 0,
      o3: 0,
      so2: 0,
      pm2_5: 0,
      pm10: 0,
      nh3: 0,
    },
  },
};

export const pollutionSlice = createSlice({
  name: "pollution",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPollution.fulfilled, (state, action) => {
      state.data = action.payload.list[0];
    });
    builder.addCase(fetchPollution.pending, (state, action) => {});
    builder.addCase(fetchPollution.rejected, (state, action) => {
      console.log("Error rejected api pollution");
    });
  },
});

export default pollutionSlice.reducer;
