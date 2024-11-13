import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import axios from 'axios';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const navigate = useNavigate();
  
  const API_URL = 'https://backendfindout-ea692e018a66.herokuapp.com/api/login/';
  const NOTIFICATIONS_URL = 'https://backendfindout-ea692e018a66.herokuapp.com/api/notifications/';

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const config = {
          headers: {
            'Authorization': `Token ${token}`
          }
        };

        const response = await axios.get(API_URL, config);
        setUser(response.data);

        // Fetch notifications
        const notificationsResponse = await axios.get(NOTIFICATIONS_URL, config);
        setNotifications(notificationsResponse.data);
        setUnreadNotifications(notificationsResponse.data.filter(n => !n.read).length);
      } catch (err) {
        console.error('Error fetching user data:', err);
        localStorage.removeItem('token');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNotificationClick = () => {
    // Mark notifications as read
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    
    notifications.forEach(async (notification) => {
      if (!notification.read) {
        await axios.patch(`${NOTIFICATIONS_URL}${notification.id}/`, { read: true }, config);
      }
    });

    setUnreadNotifications(0);
    // Navigate to notifications page or show modal
    navigate('/notifications');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-primary dark:bg-gray-900 shadow-md dark:shadow-gray-900/50 z-50 font-['Poppins',sans-serif] transition-all duration-500 ease-in-out ${
          showHeader ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
      >
        <nav className="container mx-auto flex justify-between items-center h-16 px-6">
          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Logo */}
          <div className="flex justify-center flex-1">
            <Link to="/" className="relative">
              <img
                src="/logoFindout.webp"
                alt="Logo"
                className="h-6 object-contain dark:brightness-110 transition-all"
              />
            </Link>
          </div>

          {/* Notifications */}
          <button
            onClick={handleNotificationClick}
            className="text-white hover:opacity-80 transition-opacity relative"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white font-bold rounded-full px-2 py-1 text-xs transform translate-x-1/2 -translate-y-1/2">
                {unreadNotifications}
              </span>
            )}
          </button>
        </nav>

        {/* Progress bar indicator */}
        <div className="h-0.5 bg-gradient-to-r from-primary-dark to-primary dark:from-gray-800 dark:to-gray-700" />
      </header>

      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        user={user}
      />
    </>
  );
};

export default Header;