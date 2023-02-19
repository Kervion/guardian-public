import { useEffect, useState } from "react";
import pstore from "scripts/pstore";
import zstore from "scripts/zstore";
import NewsCard from "components/NewsCard";
import HeaderButtons from "components/HeaderButtons";
import useAxios from "scripts/useAxios";

function Home() {
  const [tempGuards, setTemporaryGuards] = useState([]);
  const guardians = pstore((state) => state.guardians);
  const setGuardians = pstore((state) => state.setGuardians);
  const cultures = pstore((state) => state.cultures);
  const setCultures = pstore((state) => state.setCultures);
  const techs = pstore((state) => state.techs);
  const setTechs = pstore((state) => state.setTechs);
  const hook = useAxios("simple", "news&page-size=40");
  const culture = useAxios("simple", "culture&page-size=3");
  const technology = useAxios("simple", "technology&page-size=3");
  const mobile = zstore((state) => state.mobile);

  useEffect(() => {
    if (guardians.length === 0 && hook.data) {
      let tempResults = hook.data.results;
      let index = 0;
      tempResults.every((element) => {
        if (index === 8) {
          return false;
        }
        if (element.id.indexOf("corrections-and-clarifications") === -1 && element.fields.thumbnail) {
          setTemporaryGuards((prevArray) => [...prevArray, element]);
          index++;
        }
        return true;
      });
    }
  }, [hook]);

  useEffect(() => {
    culture.data && setCultures(culture.data.results);
  }, [culture]);

  useEffect(() => {
    technology.data && setTechs(technology.data.results);
  }, [technology]);

  useEffect(() => {
    if (tempGuards.length === 8) setGuardians([...tempGuards]);
  }, [tempGuards]);

  const [sort, setSort] = useState(true);
  const reverse = () => {
    const reversedItems = [...guardians].reverse();
    setGuardians(reversedItems);
    setSort(!sort);
  };

  return (
    <div className="container">
      <div className="home_topline">
        <h1>Top Stories</h1>
        {!mobile && <HeaderButtons sort={sort} reverse={reverse}></HeaderButtons>}
      </div>
      <div className="wrapper">
        {guardians.map((guardian, index) => (
          <NewsCard key={index} data={guardian} item={index} indarr={index} type="news" />
        ))}
      </div>
      <h1 className="section_title">Culture</h1>
      <div className="sections">
        {cultures.map((culture, index) => (
          <NewsCard key={index} data={culture} item={mobile ? index : "7"} indarr={index} type="culture" />
        ))}
      </div>
      <h1 className="section_title">Technology</h1>
      <div className="sections">
        {techs.map((tech, index) => (
          <NewsCard key={index} data={tech} item={mobile ? index : "7"} indarr={index} type="technology" />
        ))}
      </div>
    </div>
  );
}

export default Home;
