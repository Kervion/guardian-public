import { useState, useEffect } from "react";

function useWidth() {
  const [width, setWidth] = useState(undefined);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export default useWidth;
