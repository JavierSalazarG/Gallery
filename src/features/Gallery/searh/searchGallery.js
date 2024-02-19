import { createSlice } from "@reduxjs/toolkit";
import { galleryThunk } from "../galleryThunk";

export const searchGallery = createSlice({
  name: "search",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(galleryThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(galleryThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(galleryThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchData = (state) => state.search.data;
export const fetchStatus = (state) => state.search.status;
export const fetchError = (state) => state.search.error;
