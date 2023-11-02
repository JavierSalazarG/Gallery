import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice } from "../features/Gallery/favoriteSlice";
import { searchGallery } from "../features/Gallery/searchGallery";
export const store = configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
    search: searchGallery.reducer,
  },
});
