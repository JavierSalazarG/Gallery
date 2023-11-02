import { createAsyncThunk } from "@reduxjs/toolkit";

const key = import.meta.env.VITE_API_KEY;

export const galleryThunk = createAsyncThunk(
  "search/galleryThunck",
  async () => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=random&per_page=20&page=1&client_id=${key}`
    );

    if (response.ok) {
      const data = await response.json();
      const formattedData = data.results.map((result) => ({
        id: result.id,
        url: result.urls.regular,
        urlFull: result.urls.full,
        description: result.description,
        width: result.width,
        height: result.height,
        likes: result.likes,
        download: result.links.download,
        favorite: false,
      }));
      return formattedData;
    } else {
      throw new Error("Failed to fetch data from the API");
    }
  }
);
