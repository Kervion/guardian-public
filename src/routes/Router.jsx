import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navig from "layout/Navig";
import Home from "./Home";
import Bookmarks from "./Bookmarks";
import Article from "./Article";
import { useEffect } from "react";
import zstore from "scripts/zstore";
import useWidth from "scripts/useWidth.js";
import Search from "./Search";
import Spinner from "components/Spinner";
import Info from "./Info";
import Infinite from "./Infinite";

function Routerx() {
  const spinner = zstore((state) => state.spinner);
  const scrwidth = useWidth();
  const setMobile = zstore((state) => state.setMobile);
  useEffect(() => {
    scrwidth <= 800 ? setMobile(true) : setMobile(false);
  }, [scrwidth]);

  return (
    <BrowserRouter basename="/guardian">
      <Navig />
      {spinner && <Spinner />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/info" element={<Info />} />
        <Route path="/article/:type/:idx/:short" element={<Article />} />
        <Route path="/infinite/:category" element={<Infinite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routerx;
