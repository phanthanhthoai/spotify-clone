import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Layout from './layout';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  
  if (loading) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold">Loading...</h1>
      </Layout>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
