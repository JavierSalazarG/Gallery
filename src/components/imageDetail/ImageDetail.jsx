import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  getGalleryData,
  deleteImage,
} from "../../features/Gallery/favoriteSlice";
import "./imageDetail.css";

const ImageDetail = () => {
  const { image_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imagesFavorite = useSelector(getGalleryData);
  const imageFavorite = imagesFavorite
    ? imagesFavorite.find((img) => img.id === image_id)
    : null;
  if (!imageFavorite) {
    return <div>No se encontró la imagen favorita</div>;
  }
  const handleDelete = async () => {
    await dispatch(deleteImage(imageFavorite.id));
    navigate("/");
  };
  return (
    <div className="div__container">
      <div className="div__container_img">
        <img
          className="img__details"
          src={imageFavorite.url}
          alt={imageFavorite.description}
        />
      </div>
      <div className="div__text_ccontainer">
        <div className="div__description">
          <h2>Description</h2>
          <p>{imageFavorite.description}</p>
        </div>
        <div className="div__extent">
          <h2>extent</h2>
          <p>{`${imageFavorite.width} px`}</p>
          <p>{`${imageFavorite.height} px`}</p>
          <h2>Likes</h2>
          <p>{`${imageFavorite.likes} `}</p>
        </div>
      </div>
      <div className="div__button">
        <button>
          <img
            onClick={handleDelete}
            className="img__options vibrate-1"
            src="../../../public/papelera-de-reciclaje.svg"
          />
        </button>
        <button>
          <img
            className="img__options vibrate-1"
            src="../../../public/descargas.svg"
          />
        </button>
        <button>
          <img
            className="img__options vibrate-1"
            src="../../../public/lapiz.svg"
          />
        </button>
        <Link to="/favorites">
          <img
            className="img__options vibrate-1"
            src="../../../public/volver_naranja.svg"
          />
        </Link>
      </div>
    </div>
  );
};

export default ImageDetail;
