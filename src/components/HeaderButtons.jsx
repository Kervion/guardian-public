import "styles/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

function HeaderButtons(props) {
  return (
    <div className="nav_order">
      <button onClick={props.reverse} className="order_button">
        {props.sort ? "Newest first" : "Oldest first"}
        <FontAwesomeIcon icon={faSort} className="awesome_order" />
      </button>
    </div>
  );
}

export default HeaderButtons;
