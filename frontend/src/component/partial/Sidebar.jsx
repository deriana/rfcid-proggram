import React, { useEffect, useState } from "react";
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
import NavItem from "./NavItem"; // Komponen NavItem untuk menu navigasi

const Sidebar = ({ isVisible }) => {
  const [selected, setSelected] = useState(null);
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);
  const [role, setRole] = useState(null); // Menyimpan role user

  const handleMenuItemClick = (item) => {
    setSelected((prevSelected) => (prevSelected === item ? "" : item));
  };

  const toggleReportDropdown = () => {
    setReportDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const adminData = localStorage.getItem("adminData"); // Mengambil data dari localStorage
    if (adminData) {
      const { role } = JSON.parse(adminData); // Mengambil properti "role" dari data
      setRole(role); // Menyimpan role ke state
    }
  }, []);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-black text-white overflow-y-hidden transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-row items-center justify-center gap-3 px-4 py-4 lg:py-5">
        <img
          src="/logo.png"
          alt="logo smakzie"
          className="h-10 w-auto lg:h-12"
        />
        <h1 className="text-white text-xl lg:text-2xl font-semibold">
          Present Zie
        </h1>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Semua role dapat melihat Dashboard */}
              <NavItem
                href="/"
                icon={faTachometerAlt}
                label="Dashboard"
                selected={selected === "Dashboard"}
                onClick={() => handleMenuItemClick("Dashboard")}
              />

              {/* Semua role dapat melihat Scan Kartu */}
              <NavItem
                href="/rfcid-scans"
                icon={faIdCard}
                label="Scan Kartu"
                selected={selected === "Scan Kartu"}
                onClick={() => handleMenuItemClick("Scan Kartu")}
              />

              {/* Semua role dapat melihat Absen Guru */}
              <NavItem
                href="/absent-users"
                icon={faChalkboardTeacher}
                label="Absen Guru"
                selected={selected === "Absen Guru"}
                onClick={() => handleMenuItemClick("Absen Guru")}
              />

              {/* Hanya admin yang dapat melihat menu Laporan */}
              {role === "admin" && (
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
              )}

              {role === "admin" && (
                <NavItem
                  href="/users"
                  icon={faUsers}
                  label="Guru"
                  selected={selected === "Guru"}
                  onClick={() => handleMenuItemClick("Guru")}
                />
              )}

              {/* Hanya admin yang dapat melihat menu Admin */}
              {role === "admin" && (
                <NavItem
                  href="/admin"
                  icon={faUserCog}
                  label="Admin"
                  selected={selected === "Admin"}
                  onClick={() => handleMenuItemClick("Admin")}
                />
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
