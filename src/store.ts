import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherSlice";
import pollutionReducer from "./reducers/pollutionSlice";
import widgetsReducer from "./reducers/widgetsSlice";
import widgetsArrangementReducer from "./reducers/widgetsArrangementSlice";
import favouritePlacesReducer from "./reducers/favouritePlacesSlice";

const rootReducers = combineReducers({
  weatherReducer,
  pollutionReducer,
  widgetsReducer,
  widgetsArrangementReducer,
  favouritePlacesReducer
})

export const store = configureStore({
  reducer: {
    rootReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
