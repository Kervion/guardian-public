import ReactDOM from "react-dom/client";
import "styles/index.css";
import "styles/text.css";
import "styles/navigation.css";
import "styles/article.css";
import "styles/search.css";
import "styles/responsive.css";
import Router from "routes/Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);
