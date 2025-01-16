import React from "react";

const CardDashboard = ({
  title,
  value,
  description,
  percentageChange,
  icon,
}) => {
  const displayValue = value !== null && value !== undefined ? value : "0"; 

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {displayValue}
          </h4>
          <span className="text-sm font-medium">{description}</span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3"></span>
      </div>
    </div>
  );
};

export default CardDashboard;
