import React, { useState, useEffect } from "react";

const Preloader = () => {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(false), 500);
    return () => clearTimeout(timeout); // Clean up the timeout on unmount
  }, []);

  if (!loaded) return null; // Do not render preloader once it's loaded

  return (
    <div className="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Preloader;
