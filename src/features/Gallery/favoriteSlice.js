import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    data: JSON.parse(localStorage.getItem("favorites")) || [],
    filter: null,
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
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },
    deleteImage: (state, action) => {
      const imageIdToDelete = action.payload;
      state.data = state.data.filter((image) => image.id !== imageIdToDelete);
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },
    updateImage: (state, action) => {
      const updatedImage = action.payload;
      state.data = state.data.map((image) =>
        image.id === updatedImage.id ? updatedImage : image
      );
      localStorage.setItem("favorites", JSON.stringify(state.data));
    },
    filterFavorite: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const getGalleryData = (state) => state.favorite.data;
export const getInfoFilter = (state) => state.favorite.filter;

export const { addfavorite, deleteImage, updateImage, filterFavorite } =
  favoriteSlice.actions;
