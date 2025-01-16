import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"; // Assume you're using React Router for navigation

const NavItem = ({ href, icon, label, selected, onClick }) => {
  return (
    <li>
      <Link
        to={href}
        onClick={onClick}
        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
          selected && "bg-graydark"
        }`}
      >
        <FontAwesomeIcon icon={icon} className="text-white" />
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
