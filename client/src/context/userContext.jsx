import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { GET_CART_DATA } from "../components/Apis";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  // FETCH USER DATA
  const [userInfo, setUserInfo] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [cartData, setCartData] = useState(null);
  const [removeCartData, setRemoveCartData] = useState(null);

  // STORE USER INFO
  useEffect(() => {
    const storeUserData = localStorage.getItem("BandhejHub");
    if (storeUserData) {
      const parsedUserData = JSON.parse(storeUserData);
      setUserInfo(parsedUserData);
    }
  }, []);

  
  // GET CART DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          userId: userInfo?.user?.userId,
        };

        const response = await axios.post(GET_CART_DATA, requestBody);
        setCartData(response?.data.reverse());
        setItemCount(response.data.length);
      } catch (error) {
        console.log("get cart data error", error);
      }
    };

    if (userInfo?.token) {
      fetchData();
    }
  }, [userInfo, itemCount, removeCartData]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        itemCount,
        setItemCount,
        cartData,
        setRemoveCartData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
