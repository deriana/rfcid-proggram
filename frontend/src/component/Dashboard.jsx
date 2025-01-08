import React from 'react';
import Preloader from './partial/Preloader';
import Sidebar from './partial/Sidebar';
import Header from './partial/Header';

function Dashboard() {
  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <h1>Ini Page Dashboard</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
