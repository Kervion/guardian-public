import { useState } from "react";
import bstore from "scripts/bstore";
import { Link } from "react-router-dom";
import HeaderButtons from "components/HeaderButtons";
import zstore from "scripts/zstore";

function Bookmarks() {
  const bookmarks = bstore((state) => state.bookmarks);
  const setBookmarks = bstore((state) => state.setBookmarks);
  const border = bstore((state) => state.border);
  const setBorder = bstore((state) => state.setBorder);
  const [sort, setSort] = useState(border);
  const mobile = zstore((state) => state.mobile);

  const reverse = () => {
    const reversedItems = [...bookmarks].reverse();
    setBookmarks(reversedItems);
    setSort(!sort);
    setBorder(!border);
  };

  return (
    <div className="container">
      <div className="home_topline">
        <h1>Bookmarks</h1>
        {!mobile && <HeaderButtons sort={sort} reverse={reverse}></HeaderButtons>}
      </div>
      <div className="results">
        {bookmarks.map((item, index) => (
          <div className={`item_` + index} key={index}>
            <Link to={`/article/bookmark/` + index + "/" + item.id.substring(item.id.lastIndexOf("/") + 1)}>
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

export default Bookmarks;
