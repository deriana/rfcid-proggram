import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import Hamburger icon
import Profile from "./Profile";
import Sidebar from "./Sidebar";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown for profile
  const [adminName, setAdminName] = useState(""); // State for admin name
  const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
  const sidebarRef = useRef(null); // Ref for the sidebar

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown menu state
  };

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev); // Toggle sidebar visibility
  };

  // Load admin username from localStorage
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const admin = JSON.parse(adminData);
      setAdminName(admin.username);
    }
  }, []);

  return (
    <header className="sticky top-0 z-999 w-full bg-white drop-shadow-1 transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        
        {/* Apply conditional margin only to the flex section with Hamburger and title */}
        <div className={`flex items-center ${sidebarVisible ? 'ml-64' : ''}`}>
          <button
            className="mr-4 text-2xl text-gray-600"
            onClick={toggleSidebar} // Add click handler to toggle sidebar
            aria-expanded={sidebarVisible} // Accessibility
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <h1 className="text-2xl font-bold text-gray-600 drop-shadow-lg">
            Present Zie
          </h1>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="relative">
            <a
              className="flex items-center gap-4"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDropdownToggle();
              }}
            >
              <Profile />
            </a>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default">
                <button
                  className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                  onClick={() => {
                    localStorage.removeItem("adminData");
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render Sidebar and pass visibility state */}
      <Sidebar ref={sidebarRef} isVisible={sidebarVisible} />
    </header>
  );
};

export default Header;
