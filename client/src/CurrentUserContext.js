import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

 
  useEffect(() => {
    setCurrentUser(user);
    setStatus("idle");
  }, [user]);

 

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, setStatus, user }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
