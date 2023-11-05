import "./favorites.css";
import { useSelector } from "react-redux";
import {
  getGalleryData,
  getInfoFilter,
} from "../../features/Gallery/favoriteSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [images, setImages] = useState([]);
  const imagesFavorite = useSelector(getGalleryData);
  const filterFavorite = useSelector(getInfoFilter);

  useEffect(() => {
    if (filterFavorite === "width") {
      const sortedImages = [...images].sort((a, b) => {
        const widthA = a.width ? a.width : 0;
        const widthB = b.width ? b.width : 0;

        if (widthA < widthB) {
          return -1;
        }
        if (widthA > widthB) {
          return 1;
        }

        return 0;
      });
      setImages(sortedImages);
    } else if (filterFavorite === "height") {
      const sortedImages = [...images].sort((a, b) => {
        const heightA = a.height ? a.height : 0;
        const heightB = b.height ? b.height : 0;

        if (heightA < heightB) {
          return -1;
        }
        if (heightA > heightB) {
          return 1;
        }

        return 0;
      });
      setImages(sortedImages);
    } else if (filterFavorite === "likes") {
      const sortedImages = [...images].sort((a, b) => {
        const likesA = a.likes ? a.likes : 0;
        const likesB = b.likes ? b.likes : 0;

        if (likesA < likesB) {
          return -1;
        }
        if (likesA > likesB) {
          return 1;
        }

        return 0;
      });
      setImages(sortedImages);
    } else {
      const searchText = filterFavorite ? filterFavorite.toLowerCase() : "";
      const filteredImages = imagesFavorite.filter((image) => {
        const description = image.description
          ? image.description.toLowerCase()
          : "";
        return description.includes(searchText);
      });

      setImages(filteredImages);
    }
  }, [filterFavorite]);

  useEffect(() => {
    setImages(...images, imagesFavorite);
  }, [imagesFavorite]);

  return (
    <section className="section">
      {images.length > 0 ? (
        images.map((image) => (
          <Link
            to={`/favorites/${image.id}`}
            className="div__element_fav"
            key={image.id}
          >
            <img
              className="img__element_fav"
              src={image.url}
              alt={image.description}
            />
          </Link>
        ))
      ) : (
        <p className="p__alerta">
          Aun no tienes fotos en favortio, vuelve y añade las que quieras😉
        </p>
      )}
    </section>
  );
};

export default Favorites;
