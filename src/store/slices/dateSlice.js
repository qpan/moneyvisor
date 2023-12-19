import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const dateSlice  = createSlice({
  name: 'date',
  initialState: {
    data: dayjs().format(),
  },
  reducers: {
    updateDate(state, action) {
      state.data = action.payload
    }
  }
});
export const { updateDate } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;