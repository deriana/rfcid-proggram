import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faIdCard,
  faChalkboardTeacher,
  faFileAlt,
  faCalendarDay,
  faCalendarAlt,
  faSyncAlt,
  faClock,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem"; // Ensure NavItem component exists

const Sidebar = ({ isVisible }) => {
  const [selected, setSelected] = useState(null);
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);

  const handleMenuItemClick = (item) => {
    setSelected((prevSelected) => (prevSelected === item ? "" : item));
  };

  const toggleReportDropdown = () => {
    setReportDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-black text-white overflow-y-hidden transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
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
              <NavItem
                href="/"
                icon={faTachometerAlt}
                label="Dashboard"
                selected={selected === "Dashboard"}
                onClick={() => handleMenuItemClick("Dashboard")}
              />

              <NavItem
                href="/users"
                icon={faUsers}
                label="Guru"
                selected={selected === "Guru"}
                onClick={() => handleMenuItemClick("Guru")}
              />

              <NavItem
                href="/rfcid-scans"
                icon={faIdCard}
                label="Scan Kartu"
                selected={selected === "Scan Kartu"}
                onClick={() => handleMenuItemClick("Scan Kartu")}
              />

              <NavItem
                href="/absent-users"
                icon={faChalkboardTeacher}
                label="Absen Guru"
                selected={selected === "Absen Guru"}
                onClick={() => handleMenuItemClick("Absen Guru")}
              />

              <li>
                <div
                  onClick={toggleReportDropdown}
                  className="group relative flex items-center gap-2.5 cursor-pointer rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark"
                >
                  <FontAwesomeIcon icon={faFileAlt} className="text-white" />
                  Laporan
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-auto transition-transform duration-200 ${
                      reportDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7l7 7 7-7"
                    />
                  </svg>
                </div>
                {reportDropdownOpen && (
                  <ul className="pl-6 space-y-2">
                    <NavItem
                      href="/report"
                      icon={faCalendarDay}
                      label="Laporan Hari Ini"
                      selected={selected === "Laporan Hari Ini"}
                      onClick={() => handleMenuItemClick("Laporan Hari Ini")}
                    />
                    <NavItem
                      href="/report-date"
                      icon={faCalendarAlt}
                      label="Laporan Tanggal"
                      selected={selected === "Laporan Tanggal"}
                      onClick={() => handleMenuItemClick("Laporan Tanggal")}
                    />
                    <NavItem
                      href="/report-recap"
                      icon={faSyncAlt}
                      label="Laporan Recap"
                      selected={selected === "Laporan Recap"}
                      onClick={() => handleMenuItemClick("Laporan Recap")}
                    />
                    <NavItem
                      href="/report-late"
                      icon={faClock}
                      label="Laporan Terlambat"
                      selected={selected === "Laporan Terlambat"}
                      onClick={() => handleMenuItemClick("Laporan Terlambat")}
                    />
                    <NavItem
                      href="/report-teacher"
                      icon={faUserCog}
                      label="Laporan Teacher"
                      selected={selected === "Laporan Teacher"}
                      onClick={() => handleMenuItemClick("Laporan Teacher")}
                    />
                  </ul>
                )}
              </li>

              <NavItem
                href="/admin"
                icon={faUserCog}
                label="Admin"
                selected={selected === "Admin"}
                onClick={() => handleMenuItemClick("Admin")}
              />
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
