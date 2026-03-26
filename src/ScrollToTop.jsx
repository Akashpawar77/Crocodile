import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force instant jump to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // prevents weird mid positions
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;