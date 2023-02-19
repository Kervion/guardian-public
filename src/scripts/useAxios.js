import { useState, useEffect } from "react";
import axios from "axios";
import zstore from "scripts/zstore";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { API, BASEAPIURL } from "scripts/globals";

const useAxios = (type, query) => {
  const simple_part_1 = "search?type=article&section=";
  const simple_part_2 = "&show-fields=shortUrl,thumbnail&";
  const setSpinner = zstore((state) => state.setSpinner);

  if (type === "simple") {
    query = simple_part_1 + query + simple_part_2;
  }
  if (type === "search") {
    query = query + simple_part_2;
  }

  const [data, setData] = useState(null);

  useEffect(() => {
    if (query !== "") {
      const fetchData = async () => {
        setSpinner(true);
        try {
          const response = await axios({
            method: "get",
            url: BASEAPIURL + query + API,
            responseType: "json",
          });
          setData(response.data.response);
        } catch (err) {
          confirmAlert({
            title: "Error",
            message: "Something has been shot down.",
            buttons: [
              {
                label: "Yeah...",
              },
            ],
          });
        } finally {
          setSpinner(false);
        }
      };
      fetchData();
    }
  }, [query]);

  return { data };
};

export default useAxios;
