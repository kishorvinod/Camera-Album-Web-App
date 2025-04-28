import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Grid, LogOut, Menu, X, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  if (!user) return null;
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                CamApp
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <Grid size={18} />
              <span>Albums</span>
            </Link>
            <Link
              to="/capture"
              className="px-3 py-2 text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <Camera size={18} />
              <span>Capture</span>
            </Link>
            <div className="border-l border-gray-200 h-6 mx-2"></div>
            <div className="flex items-center">
              <div className="mr-3 text-sm text-gray-600">
                <User size={16} className="inline mr-1" />
                {user.name}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-gray-700 hover:text-red-600 flex items-center space-x-1"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={closeMenu}
            >
              <Grid size={18} className="inline mr-2" />
              Albums
            </Link>
            <Link
              to="/capture"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={closeMenu}
            >
              <Camera size={18} className="inline mr-2" />
              Capture
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="px-3 py-2 text-sm text-gray-600">
              <User size={16} className="inline mr-2" />
              {user.name}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            >
              <LogOut size={18} className="inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;