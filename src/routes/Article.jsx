import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pstore from "scripts/pstore";
import bstore from "scripts/bstore";
import zstore from "scripts/zstore";
import { convertTimeString } from "scripts/globals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBreg } from "@fortawesome/free-regular-svg-icons";
import useAxios from "scripts/useAxios";

function Article() {
  const [article, setArticle] = useState({});
  const guardians = pstore((state) => state.guardians);
  const setBookmarks = bstore((state) => state.setBookmarks);
  const bookmarks = bstore((state) => state.bookmarks);
  const { type, idx } = useParams();
  const [add, setAdd] = useState(true);
  const cultures = pstore((state) => state.cultures);
  const techs = pstore((state) => state.techs);
  const searches = zstore((state) => state.searches);
  const scrolls = pstore((state) => state.scrolls);
  const [konkretny, setKonkretny] = useState("");
  const ending = "?show-fields=body,thumbnail,headline&";
  const hook = useAxios("article", konkretny);

  useEffect(() => {
    if (konkretny !== "" && hook.data) {
      setArticle(hook.data.content);
    }
  }, [hook]);

  useEffect(() => {
    if (type === "bookmark") {
      setArticle(bookmarks[idx]);
    } else {
      if (type === "news") setKonkretny(guardians[idx].id + ending);
      if (type === "culture") setKonkretny(cultures[idx].id + ending);
      if (type === "technology") setKonkretny(techs[idx].id + ending);
      if (type === "art" || type === "ai") setKonkretny(scrolls[idx].id + ending);
      if (type === "search") setKonkretny(searches[idx].id + ending);
    }
  }, [type]);

  useEffect(() => {
    if (bookmarks.find((item) => item.id === article.id)) {
      setAdd(false);
    }
  }, [article]);

  const onPstryk = () => {
    add ? setBookmarks([...bookmarks, article]) : setBookmarks(bookmarks.filter((element) => element.id !== article.id));
    setAdd(!add);
  };

  return (
    <div className="article">
      <div className="bookmark" onClick={onPstryk}>
        <div className="bookmark_label">{add ? "ADD BOOKMARK" : "REMOVE BOOKMARK"}</div>
        {add ? <FontAwesomeIcon icon={faBreg} /> : <FontAwesomeIcon icon={faBookmark} />}
      </div>
      <div className="time">{convertTimeString(article.webPublicationDate)}</div>
      <h1 className="a_title">{article.webTitle}</h1>
      <div className="a_twomaincols">
        <div className="box1" dangerouslySetInnerHTML={{ __html: article.fields?.body }}></div>
        <img className="a_image box2" src={article.fields?.thumbnail} alt={article.webTitle} />
      </div>
    </div>
  );
}

export default Article;
