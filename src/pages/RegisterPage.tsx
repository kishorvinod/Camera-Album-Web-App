import React from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import useAuthStore from '../store/authStore';
import { Camera } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Camera className="h-12 w-12 text-blue-600 mx-auto" />
          <h1 className="mt-2 text-3xl font-bold text-gray-900">CamApp</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create an account to get started
          </p>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;