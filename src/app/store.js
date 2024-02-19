import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice } from "../features/Gallery/favorite/favoriteSlice";
import { searchGallery } from "../features/Gallery/searh/searchGallery";
export const store = configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
    search: searchGallery.reducer,
  },
});
