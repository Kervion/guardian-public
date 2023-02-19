import { useEffect, useState } from "react";
import zstore from "scripts/zstore";
import { Link, useParams } from "react-router-dom";
import HeaderButtons from "components/HeaderButtons";
import useAxios from "scripts/useAxios";

function Search() {
  const [tempResults, setTempResults] = useState([]);
  const setSearches = zstore((state) => state.setSearches);
  const { id } = useParams();
  const setTerm = zstore((state) => state.setTerm);
  const hook = useAxios("search", "search?q=" + id + "&type=article&page-size=12");
  const [sort, setSort] = useState(true);
  const mobile = zstore((state) => state.mobile);

  const reverse = () => {
    const reversedItems = [...tempResults].reverse();
    setTempResults(reversedItems);
    setSort(!sort);
  };

  useEffect(() => {
    if (hook.data) {
      setTempResults(hook.data.results);
      setTerm("");
    }
  }, [hook.data]);

  useEffect(() => {
    setSearches([...tempResults]);
  }, [tempResults]);

  return (
    <div className="container">
      {!mobile && <HeaderButtons sort={sort} reverse={reverse}></HeaderButtons>}
      <div className="results">
        {tempResults.map((item, index) => (
          <div className={`item_` + index} key={index}>
            <Link to={`/article/search/` + index + "/" + item.id.substring(item.id.lastIndexOf("/") + 1)}>
              <div className="imgWrapper">
                <img src={item.fields.thumbnail} className="thumb" alt={item.webTitle} />
              </div>
              <div className="textSpace">
                <h3>{item.webTitle}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
