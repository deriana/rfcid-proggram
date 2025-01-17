import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardDashboard = ({
  title,
  value,
  description,
  percentageChange,
  icon,
  bgColor, // Allow dynamic background color
}) => {
  const displayValue = value !== null && value !== undefined ? value : "0"; 

  return (
    <div className={`rounded-lg border border-stroke px-6 py-4 shadow-lg ${bgColor} text-white`}>
      {/* Flex Row Container */}
      <div className="flex items-center space-x-4"> 
        {/* Icon Section */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
          <FontAwesomeIcon icon={icon} className="h-7 w-7" />
        </div>

        {/* Title and Value Section */}
        <div className="flex-1"> 
          <h4 className="text-xl font-semibold">{displayValue}</h4>
          <span className="text-sm font-medium">{description}</span>
        </div>

        {/* Percentage change Section */}
        <div>
          <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
            {percentageChange && (
              <span className={`${percentageChange > 0 ? "text-green-500" : "text-red-500"}`}>
                {percentageChange}%
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
