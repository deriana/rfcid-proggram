import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom"; // Untuk navigasi

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown for profile
  const [adminName, setAdminName] = useState(""); // State for admin name
  const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
  const sidebarRef = useRef(null); // Ref for the sidebar
  const headerRef = useRef(null); // Ref for the header
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const navigate = useNavigate(); // Inisialisasi navigate hook

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown menu state
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev); // Toggle sidebar visibility
  };

  // Load admin username from localStorage
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const admin = JSON.parse(adminData);
      setAdminName(admin.username);
    }
  }, []);

  const handleLogout = () => {
    // SweetAlert2 Confirmation Dialog
    swal
      .fire({
        title: "Are you sure?",
        text: "You are about to log out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log me out!",
        cancelButtonText: "Cancel",
        reverseButtons: true, // Make sure the cancel button comes first
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/logout");
        }
      });
  };

  // Effect to handle closing dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Tutup dropdown jika klik di luar elemen terkait
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !headerRef.current.contains(event.target) &&
        (!sidebarRef.current || !sidebarRef.current.contains(event.target))
      ) {
        setDropdownOpen(false);
        setSidebarVisible(false); // Tutup sidebar juga jika ingin
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-999 w-full bg-white drop-shadow-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Apply conditional margin only to the flex section with Hamburger and title */}
        <div
          className={`flex items-center ${
            sidebarVisible && window.innerWidth >= 1024 ? "ml-64" : ""
          }`}
        >
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
          <div className="relative" ref={dropdownRef}>
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
                  onClick={handleLogout} // Trigger SweetAlert2 logout
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
