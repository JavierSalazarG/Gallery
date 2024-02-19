import { Link, useLocation } from "react-router-dom";
import "./header.css";
import glass from "../../../public/glass_input.png";
import { useState, useEffect } from "react";
import heartImage from "../../../public/4eba1449b54ec1a2dc5c16b773e00b28.png";
import volverImage from "../../../public/volver.svg";
import { useDispatch } from "react-redux";
import { galleryThunk } from "../../features/Gallery/galleryThunk";

import { filterFavorite } from "../../features/Gallery/favorite/favoriteSlice";

const Header = () => {
  const [look, setLook] = useState();
  const dispatch = useDispatch();
  const [isFavoritePage, setIsFavoritePage] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsFavoritePage(location.pathname === "/favorites");
  }, [location.pathname]);

  const handleLook = (e) => {
    setLook(e.target.value);
  };

  const handleTags = (e) => {
    if (location.pathname === "/") {
      dispatch(galleryThunk(e.target.value));
    } else {
      dispatch(filterFavorite(e.target.value));
    }
  };

  const handleDescription = (e) => {
    dispatch(filterFavorite(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(galleryThunk(look));
  };

  return (
    <header className="header">
      <div className="div__nav">
        <form onSubmit={handleSubmit} className="form__nav">
          {location.pathname === "/" ? (
            <input
              className="input__nav"
              placeholder="..."
              type="text"
              onChange={handleLook}
              name="input"
            />
          ) : (
            <input
              className={
                location.pathname === "/favorites"
                  ? "input__nav"
                  : "input__nav_display"
              }
              placeholder="search by description..."
              type="text"
              onChange={handleDescription}
              name="input"
            />
          )}
          <input
            className={
              location.pathname === "/" || location.pathname === "/favorites"
                ? "input__image jello-horizontal"
                : "input__nav_display"
            }
            type="image"
            src={glass}
            alt="glasss"
          />
          {location.pathname === "/" ? (
            <select
              className={
                location.pathname === "/"
                  ? "select__tags"
                  : "input__nav_display"
              }
              onChange={handleTags}
            >
              <option value="">...</option>
              <option value="paisaje">Landscape</option>
              <option value="retrato">Portrait</option>
              <option value="animal">Animal</option>
              <option value="edificio">Building</option>
            </select>
          ) : (
            <select
              className={
                location.pathname === "/favorites"
                  ? "select__tags"
                  : "input__nav_display"
              }
              onChange={handleTags}
            >
              <option value="">...</option>
              <option value="width">Width</option>
              <option value="height">Height</option>
              <option value="likes">Likes</option>
            </select>
          )}

          <Link
            className={
              location.pathname === "/favorites" || location.pathname === "/"
                ? "input__nav_display "
                : "link__home text-shadow-drop-center"
            }
            to={"/"}
          >
            HOME
          </Link>
        </form>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#26a69a"
          d="M0,160L40,138.7C80,117,160,75,240,69.3C320,64,400,96,480,101.3C560,107,640,85,720,112C800,139,880,213,960,202.7C1040,192,1120,96,1200,74.7C1280,53,1360,107,1400,133.3L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <div className="div__button_save">
        <Link
          to={isFavoritePage ? "/" : "/favorites"}
          className="button__save_img "
        >
          <img
            className="img__heart pulsate-bck"
            src={isFavoritePage ? volverImage : heartImage}
            alt="heart"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
