import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useBlockNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);

    const handleBackButton = () => {
      navigate(window.location.pathname); 
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
};

export default useBlockNavigation;
