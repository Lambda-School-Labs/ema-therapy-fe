/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { parseJwt } from '../components/Auth/axiosAuth/axios';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }, props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setIsAuthenticated(false);
      if (localStorage.token) {
        console.log('1');
        const userFromToken = parseJwt(localStorage.token);
        const userExpDate = new Date().setSeconds(userFromToken.exp);
        if (userExpDate > Date.now()) {
          console.log('2');
          setUser(userFromToken);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          localStorage.clear();
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
        }
      }
      setLoading(false);
    };
    initAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        setIsAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
