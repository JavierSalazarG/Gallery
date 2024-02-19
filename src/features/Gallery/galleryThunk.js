import { createAsyncThunk } from "@reduxjs/toolkit";

const key = import.meta.env.VITE_API_KEY;
console.log("console de key --->" + key);
export const galleryThunk = createAsyncThunk(
  "search/galleryThunck",
  async (look, page) => {
    let url;
    if (look === "") {
      url = `https://api.unsplash.com/photos/random?client_id=${key}&count=20`;
    } else {
      url = `https://api.unsplash.com/search/photos?query=${look}&per_page=20&page=${page}&client_id=${key}`;
    }

    const response = await fetch(url);

    let formattedData;
    if (response.ok) {
      const data = await response.json();
      if (look === "") {
        formattedData = data.map((result) => ({
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
      } else {
        formattedData = data.results.map((result) => ({
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
      }
      return formattedData;
    } else {
      throw new Error("Failed to fetch data from the API");
    }
  }
);
