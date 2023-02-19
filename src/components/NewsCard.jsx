import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import zstore from "scripts/zstore";

function NewsCard(props) {
  const [shorturl, setShorturl] = useState("");
  const mobile = zstore((state) => state.mobile);
  useEffect(() => {
    let str = props.data.id;
    setShorturl(str.substring(str.lastIndexOf("/") + 1));
  }, [props.data.id]);
  return (
    <div className={"item" + (props.item + 1)}>
      <Link to={"/article/" + props.type + "/" + props.indarr + "/" + shorturl}>
        {mobile ? (
          <div className="imgWrapper">
            <img src={props.data?.fields?.thumbnail} alt={props.data?.webTitle} className="thumb" />
          </div>
        ) : (
          props.item != "3" &&
          props.item != "4" && (
            <div className="imgWrapper">
              <img src={props.data?.fields?.thumbnail} alt={props.data?.webTitle} className="thumb" />
            </div>
          )
        )}
        <div className="textSpace">
          {props.item === 0 && <h2>{props.data?.webTitle}</h2>}
          {(props.item === 1 || props.item === 2 || props.item === 3 || props.item === 4) && <h3>{props.data?.webTitle}</h3>}
          {(props.item === 5 || props.item === 6 || props.item == 7) && <h4>{props.data?.webTitle}</h4>}
        </div>
      </Link>
    </div>
  );
}

export default NewsCard;
