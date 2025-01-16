import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = ({ href, icon, label, selected, onClick }) => {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className={`flex items-center gap-2.5 px-4 py-2 text-white transition-all duration-300 hover:bg-gray-800 ${
          selected ? "bg-gray-700" : ""
        }`}
      >
        <FontAwesomeIcon icon={icon} className="text-white" />
        {label}
      </a>
    </li>
  );
};

export default NavItem;
