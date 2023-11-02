import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ImageList from "./components/ImageList/ImageList";
import Favorites from "./components/favorites/Favorites";
import { Routes, Route } from "react-router-dom";
import ImageDetail from "./components/imageDetail/ImageDetail";
import "./App.css";

const Home = () => <ImageList />;
const Favorite = () => <Favorites />;
const ImagesDetail = () => <ImageDetail />;
const Error = () => <h1>404 ERROR</h1>;
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/favorites/:image_id" element={<ImagesDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
