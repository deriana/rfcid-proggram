import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();  // Hook to navigate

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <h1>Absensi Zie</h1>
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* User Area */}
          <div
            className="relative"
            onClickOutside={() => setDropdownOpen(false)}
          >
            <a
              className="flex items-center gap-4"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <span className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center">
                <div className="text-white">U</div>
              </span>
            </a>

            {/* Dropdown Start */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default">
                <button
                  className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                  onClick={() => {
                    // Navigate to /logout when Log Out is clicked
                    navigate("/logout");
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
            {/* Dropdown End */}
          </div>
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default Header;
