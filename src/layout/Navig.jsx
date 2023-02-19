import logo from "assets/OpenGuardian.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ReactComponent as SearchSvg } from "assets/search-icon@2x.svg";
import bstore from "scripts/bstore";
import zstore from "scripts/zstore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useWidth from "scripts/useWidth.js";

function Navig() {
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const dropdownRef = useRef(null);
  const [viewSearch, setViewSearch] = useState(false);
  const [viewLink, setViewLink] = useState(false);
  const bookmarks = bstore((state) => state.bookmarks);
  const term = zstore((state) => state.term);
  const setTerm = zstore((state) => state.setTerm);
  const mobile = zstore((state) => state.mobile);
  const scrwidth = useWidth();

  const menux = [
    { link: "/infinite/art", label: "Art", short: "Art" },
    { link: "/infinite/ai", label: "Artificial Intelligence", short: "AI" },
    { link: "/info", label: "About", short: "About" },
  ];

  const search = () => {
    viewSearch && setTerm("");
    setViewSearch(!viewSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/search/" + term);
    }
  };

  useEffect(() => {
    bookmarks.length > 0 ? setViewLink(true) : setViewLink(false);
  }, [bookmarks]);

  useEffect(() => {
    term === "" && searchInput.current?.blur();
  }, [term]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="nav_container">
      <div className="nav_bar">
        {/* MOBILE NAVIGATION */}
        {mobile && (
          <>
            <div>
              <Link to="/">
                <img src={logo} className="nav_logo" alt="open api guardian logo" />
              </Link>
            </div>
            <input ref={searchInput} className="input_search" type="text" value={term} onKeyDown={handleKeyDown} onChange={(e) => setTerm(e.target.value)} placeholder="search" />
            <div className="dropdown" ref={dropdownRef}>
              <FontAwesomeIcon icon={faBars} onClick={toggleDropdown} size="2x" className="awesome_bars" />
              {isOpen && (
                <div className="dropdown_content">
                  {menux.map((item, index) => (
                    <Link className="dropdown_link bline" key={index} to={item.link} onClick={close}>
                      {item.short}
                    </Link>
                  ))}
                  {viewLink && (
                    <Link className="dropdown_link" to="/bookmarks" onClick={close}>
                      Bookmarks
                    </Link>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* DESKTOP NAVIGATION */}
        {!mobile && (
          <>
            <div>
              <Link to="/">
                <img src={logo} className="nav_logo" alt="open api guardian logo" />
              </Link>
              {menux.map((item, index) => (
                <Link className="nav_link" key={index} to={item.link}>
                  {scrwidth <= 1000 ? item.short : item.label}
                </Link>
              ))}
              {viewLink && (
                <Link className="nav_link" to="/bookmarks">
                  Bookmarks
                </Link>
              )}
            </div>

            <div className="nav_search">
              {viewSearch && <input ref={searchInput} className="input_search" type="text" value={term} onKeyDown={handleKeyDown} onChange={(e) => setTerm(e.target.value)} />}
              <SearchSvg onClick={search} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navig;
