import { useState } from "react";
import "./footer.css";
import { useDispatch } from "react-redux";
import { galleryThunk } from "../../features/Gallery/galleryThunk";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const handleBefore = () => {
    if (page <= 1) {
      setPage(page);
    } else {
      setPage(page - 1);
    }
    dispatch(galleryThunk(page));
  };
  const handleNex = () => {
    setPage(page + 1);
    dispatch(galleryThunk(page));
  };

  const hantlefirst = () => {
    setPage(1);
    dispatch(galleryThunk(page));
  };
  const hantleFinish = () => {
    setPage(30);
    dispatch(galleryThunk(page));
  };

  return (
    <footer className="footer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#26a69a"
          d="M0,192L120,186.7C240,181,480,171,720,176C960,181,1200,203,1320,213.3L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
      <div className="div__footer">
        {location.pathname === "/" && (
          <div className="div__options">
            {page > 1 && (
              <>
                <button className="primera blink-1" onClick={handleBefore}>
                  ‹
                </button>
                <button className="button__rapid" onClick={hantlefirst}>
                  1
                </button>
                <p> ... </p>
              </>
            )}
            <p> {page} </p>
            {page < 30 && (
              <>
                <p> ... </p>
                <button className="button__rapid" onClick={hantleFinish}>
                  30
                </button>
                <button className="blink-1" onClick={handleNex}>
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
