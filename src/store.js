import { configureStore } from "@reduxjs/toolkit";
import jsonDataReducer from "./redux/jsonDataSlice";

export const store = configureStore({
  reducer: {
    jsonData: jsonDataReducer,
  },
});
