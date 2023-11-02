import "./favorites.css";
import { useSelector } from "react-redux";
import { getGalleryData } from "../../features/Gallery/favoriteSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [images, setImages] = useState([]);
  const imagesFavorite = useSelector(getGalleryData);

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
