// src/components/Profile.js
import React from 'react';
import { useAuth } from '../utils/dataStore';

const Profile = () => {
  const { loading, user } = useAuth();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  );
};

export default Profile;
