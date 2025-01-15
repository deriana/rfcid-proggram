import React, { useState } from "react";

const Sidebar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const toggleSidebar = () => setSidebarToggle(!sidebarToggle);

  const handleMenuItemClick = (item) => {
    setSelected((prevSelected) => (prevSelected === item ? "" : item));
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-64 flex-col overflow-y-hidden bg-black transition-transform duration-300 ease-linear ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } lg:static lg:translate-x-0`}
      onClick={() => setSidebarToggle(false)}
    >
      <div className="flex items-center justify-center gap-2 px-4 py-5 lg:py-6">
        <h1 className="text-white text-3xl font-semibold">Absensi Guru</h1>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
         

              {/* Dashboard Menu */}
              <li>
                <a
                  href="/"
                  onClick={() => handleMenuItemClick("Dashboard")}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                    selected === "Dashboard" && "bg-graydark"
                  }`}
                >
                  Dashboard
                </a>
              </li>

              {/* Admin Menu */}
              <li>
                <a
                  href="/admin"
                  onClick={() => handleMenuItemClick("Admin")}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                    selected === "Admin" && "bg-graydark"
                  }`}
                >
                  Admin
                </a>
              </li>

              {/* Users Menu */}
              <li>
                <a
                  href="/users"
                  onClick={() => handleMenuItemClick("Users")}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                    selected === "Users" && "bg-graydark"
                  }`}
                >
                  Users
                </a>
              </li>

              {/* Report Menu */}
              <li>
                <a
                  href="/report"
                  onClick={() => handleMenuItemClick("Report")}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                    selected === "Report" && "bg-graydark"
                  }`}
                >
                  Report
                </a>
              </li>
              <li>
                <a
                  href="/rfcid-scans"
                  onClick={() => handleMenuItemClick("Rfcid")}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                    selected === "Report" && "bg-graydark"
                  }`}
                >
                  Rfcid
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu End */}
      </div>
    </aside>
  );
};

export default Sidebar;
