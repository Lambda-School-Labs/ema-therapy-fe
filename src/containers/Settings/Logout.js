import React from 'react';
import { useAuth0 } from '../../utils/react-auth0-spa';

const Logout = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div>{isAuthenticated && <div onClick={() => logout()}>Log out</div>}</div>
  );
};

export default Logout;