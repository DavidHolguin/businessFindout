import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Pizza, Map, Bike, FileText, Settings } from 'lucide-react';

const MenuBar = () => {
  const location = useLocation();
  const [isIconSwapped, setIsIconSwapped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsIconSwapped((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 w-full h-18 bg-white dark:bg-gray-900 flex justify-center items-center shadow-lg dark:shadow-gray-900/50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 px-2 z-10">
      <nav className="w-full max-w-lg mx-auto ">
        <ul className="flex items-center justify-evenly ">
          {/* Dashboard */}
          <li>
            <Link
              to="/"
              className="flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <BarChart2
                size={24}
                className={`text-gray-700 dark:text-gray-300 ${location.pathname === '/dashboard' ? 'text-primary dark:text-primary' : ''}`}
              />
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">Dashboard</span>
            </Link>
          </li>
         {/* Documents */}
         <li>
            <Link
              to="/documents"
              className="flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FileText
                size={24}
                className={`text-gray-700 dark:text-gray-300 ${location.pathname === '/documents' ? 'text-primary dark:text-primary' : ''}`}
              />
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">Facturas</span>
            </Link>
          </li>
          {/* Maps/Motorcycle */}
          <li className="relative -mt-[48px]">
            <Link
              to="/pedidos"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-primary dark:bg-primary shadow-lg transform transition-transform hover:scale-105"
            >
              <div className="relative w-6 h-6">
                <Map
                  className={`absolute inset-0 text-gray-900 transform transition-all duration-500 ease-in-out
                    ${isIconSwapped ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                />
                <Bike
                  className={`absolute inset-0 text-gray-900 transform transition-all duration-500 ease-in-out
                    ${isIconSwapped ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}
                />
              </div>
            </Link>
          </li>
           {/* Food */}
           <li>
            <Link
              to="/productos"
              className="flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Pizza
                size={24}
                className={`text-gray-700 dark:text-gray-300 ${location.pathname === '/food' ? 'text-primary dark:text-primary' : ''}`}
              />
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">Productos</span>
            </Link>
          </li>
          
          {/* Settings */}
          <li>
            <Link
              to="/settings"
              className="flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Settings
                size={24}
                className={`text-gray-700 dark:text-gray-300 ${location.pathname === '/settings' ? 'text-primary dark:text-primary' : ''}`}
              />
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">Ajustes</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MenuBar;