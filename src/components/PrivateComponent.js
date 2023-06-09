import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    const auth = logalStorage.getItem("user")
  return auth ? <Outlet /> : <Navigate to="register" />
}

export default PrivateComponent