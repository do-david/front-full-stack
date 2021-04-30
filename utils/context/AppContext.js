import React, { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";

export const AppContext = React.createContext();

/**
 * Provides a global application context for the entire application with the cart contents
 * @param {Object} props
 */
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [auth, setAuth] = useState(false);
  const [userDecoded, setUserDecoded] = useState({});

  useEffect(() => {
    // Check if we are client-side before we access the localStorage
    if (process.browser) {
      let cartData = localStorage.getItem('cart');
      let isAuth = localStorage.getItem('token');
      cartData = null !== cartData ? JSON.parse(cartData) : '';
      if(isAuth){
        const tokenDecoded = jwt.verify(isAuth,'supersecret');
        if(tokenDecoded){
          setAuth(true)
          setUserDecoded(tokenDecoded)
        } 
      } else {
        setAuth(false)
      }
    }
  }, []);
  return (
    <AppContext.Provider value={[cart, setCart],[auth, setAuth],[userDecoded,setUserDecoded]}>
      {children}
    </AppContext.Provider>
  );
};
