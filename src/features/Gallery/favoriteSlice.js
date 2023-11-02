import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",

  initialState: {
    data: [],
  },

  reducers: {
    addfavorite: (state, action) => {
      const newFavorites = action.payload;
      const uniqueNewFavorites = newFavorites.filter((favorite) => {
        return !state.data.some(
          (existingFavorite) => existingFavorite.id === favorite.id
        );
      });
      state.data = [...state.data, ...uniqueNewFavorites];
    },
    deleteImage: (state, action) => {
      state.data = state.data.filter((image) => image.id !== action.payload);
    },
  },
});

export const getGalleryData = (state) => state.favorite.data;

export const { addfavorite, deleteImage } = favoriteSlice.actions;
