import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import guardararchivo from "../../../public/guardar-el-archivo.svg";
import volver from "../../../public/volver_naranja.svg";
import lapiz from "../../../public/lapiz.svg";
import descargar from "../../../public/descargas.svg";
import papelera from "../../../public/papelera-de-reciclaje.svg";
import Modal from "@mui/material/Modal";
import {
  getGalleryData,
  deleteImage,
  updateImage,
} from "../../features/Gallery/favorite/favoriteSlice";
import "./imageDetail.css";

const ImageDetail = () => {
  const { image_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imagesFavorite = useSelector(getGalleryData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imageFavorite = imagesFavorite
    ? imagesFavorite.find((img) => img.id === image_id)
    : null;

  const handleDelete = async () => {
    await dispatch(deleteImage(imageFavorite.id));
    navigate("/favorites");
  };
  const [dataEdit, setDataEdit] = useState({
    description: imageFavorite ? imageFavorite.description || "" : "",
    width: imageFavorite ? imageFavorite.width || 0 : 0,
    height: imageFavorite ? imageFavorite.height || 0 : 0,
  });

  if (!imageFavorite) {
    return <div>No se encontró la imagen favorita</div>;
  }

  const handleUpdate = async () => {
    const updateData = {
      id: imageFavorite.id,
      url: imageFavorite.url,
      description: dataEdit.description,
      width: dataEdit.width,
      height: dataEdit.height,
    };
    await dispatch(updateImage(updateData));
    handleClose();
  };

  const downloadImage = async (urlDownload) => {
    setTimeout(() => {
      fetch(urlDownload)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `img.jpg`;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => alert(`Error al descargar ${error}`));
    }, 300);
  };

  return (
    <div className="div__container">
      <Modal open={open} onClose={handleClose}>
        <Box className="box">
          <form className="form__edit">
            <label>Description</label>
            <textarea
              value={dataEdit.description}
              onChange={(e) =>
                setDataEdit({ ...dataEdit, description: e.target.value })
              }
            />
            <label>Width</label>
            <input
              type="number"
              value={dataEdit.width}
              onChange={(e) =>
                setDataEdit({ ...dataEdit, width: e.target.value })
              }
            />
            <label>Height</label>
            <input
              type="number"
              value={imageFavorite.height}
              onChange={(e) =>
                setDataEdit({ ...dataEdit, height: e.target.value })
              }
            />
            <div className="div__buttons_edit">
              <button onClick={handleUpdate} className="buttons__edit">
                <img src={guardararchivo} />
              </button>
              <button onClick={handleClose} className="buttons__edit">
                <img className="img__options vibrate-1" src={volver} />
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <div className="div__datas">
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

            <p>
              {imageFavorite.description
                ? imageFavorite.description
                : "There is no description"}
            </p>
          </div>
          <div className="div__extent">
            <h2>extent</h2>
            <p>{`${imageFavorite.width} px`}</p>
            <p>{`${imageFavorite.height} px`}</p>
            <h2>Likes</h2>
            <p>{`${imageFavorite.likes} `}</p>
          </div>
        </div>
      </div>
      <div className="div__button">
        <button>
          <img
            onClick={handleDelete}
            className="img__options vibrate-1"
            src={papelera}
          />
        </button>
        <button>
          <img
            onClick={() => downloadImage(imageFavorite.urlFull, imageFavorite)}
            className="img__options vibrate-1"
            src={descargar}
          />
        </button>
        <button>
          <img
            onClick={handleOpen}
            className="img__options vibrate-1"
            src={lapiz}
          />
        </button>
        <Link to="/favorites">
          <img className="img__options vibrate-1" src={volver} />
        </Link>
      </div>
    </div>
  );
};

export default ImageDetail;
