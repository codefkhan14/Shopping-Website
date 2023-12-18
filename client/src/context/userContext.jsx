import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  // FETCH USER DATA
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const storeUserData = localStorage.getItem("BandhejHub");
    if (storeUserData) {
      const parsedUserData = JSON.parse(storeUserData);
      setUserInfo(parsedUserData);
    }
  }, []);

  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    const myCookie = localStorage.getItem("token");
    if (myCookie) {
      axios
        .post("http://localhost:5000/cart/data", { cookie: myCookie })
        .then((response) => {
          setItemCount(response.data.length);
        })
        .catch((error) => {
          console.log("Profile Frontend error", error);
        });
    } else {
      console.log("coookie not find");
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        userInfo,
        itemCount,
        setItemCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
