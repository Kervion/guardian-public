import { useEffect, useState } from "react";
import axios from "axios";
import { API, BASEAPIURL } from "scripts/globals";
import { Link, useParams } from "react-router-dom";
import pstore from "scripts/pstore";
import zstore from "scripts/zstore";
import demmy from "assets/demmy.jpg";

function Infinite() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const { category } = useParams();
  const setScrolls = pstore((state) => state.setScrolls);
  const qstring1 = "search?q=";
  const qstring2 = "&type=article&order-by=newest&page-size=12&page=";
  const qstring3 = "&show-fields=shortUrl,thumbnail&show-tags=" + category + "&";
  const [resultsByPage, setResultsByPage] = useState(qstring1 + category + qstring2 + page + qstring3);
  const setSpinner = zstore((state) => state.setSpinner);

  const fetchdata = () => {
    page === 1 && setSpinner(true);
    axios({
      method: "get",
      url: BASEAPIURL + resultsByPage + API,
      responseType: "json",
    }).then(function (response) {
      setItems((prevItems) => [...prevItems, ...response.data.response.results]);
      setPage(page + 1);
      page === 1 && setSpinner(false);
    });
  };

  useEffect(() => {
    setScrolls(items);
  }, [items]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setResultsByPage(qstring1 + category + qstring2 + "1" + qstring3);
  }, [category]);

  useEffect(() => {
    fetchdata();
  }, [resultsByPage]);

  useEffect(() => {
    if (page < 5) {
      const handleScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
          window.removeEventListener("scroll", handleScroll);
          setResultsByPage(qstring1 + category + qstring2 + page + qstring3);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page]);

  return (
    <div className="container">
      <div className="results">
        {items.map((item, index) => (
          <div key={index}>
            {item.id.indexOf("corrections-and-clarifications") === -1 ? (
              <Link to={"/article/" + category + "/" + index + "/" + item.id.substring(item.id.lastIndexOf("/") + 1)}>
                <div className="imgWrapper">
                  <img src={item.fields.thumbnail} className="thumb" alt={item.webTitle} />
                </div>
                <div className="textSpace">
                  <h3>{item.webTitle}</h3>
                </div>
              </Link>
            ) : (
              <a href="https://kervion.com" target="_blank">
                <div className="imgWrapper">
                  <img src={demmy} className="thumb" alt="demmy kervion" />
                </div>
                <div className="textSpace">
                  <h3>Q : Working with AI since 2018</h3>
                </div>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Infinite;
