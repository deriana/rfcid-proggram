import React from "react";
import Preloader from "./partial/Preloader";
import CameraAccess from "./CameraAccess";

const NotFound = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-screen flex items-center justify-center">
      <Preloader />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800">
        <h1 className="text-9xl font-extrabold text-red-600 dark:text-red-500">
          404
        </h1>
        <p className="text-2xl font-medium text-gray-700 dark:text-gray-200">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <a
          href="/"
          className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
