import { useEffect, useState } from "react";
import "./ImageList.css";
import { useDispatch, useSelector } from "react-redux";
import { addfavorite } from "../../features/Gallery/favoriteSlice";
import { galleryThunk } from "../../features/Gallery/galleryThunk.js";
import {
  fetchData,
  fetchStatus,
  fetchError,
} from "../../features/Gallery/searchGallery.js";

const ImageList = () => {
  const dispatch = useDispatch();
  const data = useSelector(fetchData);
  const status = useSelector(fetchStatus);
  const error = useSelector(fetchError);
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleFavorite = (id) => {
    setDatas((prevDatas) =>
      prevDatas.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            favorite: !data.favorite,
          };
        }
        return data;
      })
    );
  };

  useEffect(() => {
    const favoritesToAdd = datas.filter((data) => data.favorite);
    dispatch(addfavorite(favoritesToAdd));
  }, [datas]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(galleryThunk(""));
      setIsLoading(false);
    } else if (status === "fulfilled") {
      setDatas(
        data.map((dat) => ({
          id: dat.id,
          url: dat.url,
          urlFull: dat.urlFull,
          description: dat.description,
          width: dat.width,
          height: dat.height,
          likes: dat.likes,
          favorite: false,
        }))
      );
      setIsLoading(false);
    } else if (status === "error") {
      console.log(error);
      setIsLoading(false);
    }
  }, [dispatch, status]);

  return (
    <main className="main">
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        datas.map((data) => (
          <div className="div__element" key={data.id}>
            <img className="img__element" src={data.url} />

            <button className="button__favorite">
              <img
                className="pulsate-fwd"
                color="img_heart_good"
                onClick={() => handleFavorite(data.id)}
                src={
                  data.favorite
                    ? "../../../public/corazon-activo.svg"
                    : "../../../public/corazon.svg"
                }
              />
            </button>
          </div>
        ))
      )}
    </main>
  );
};

export default ImageList;
