import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileNav from "./MobileNav";


const MainLayout = () => {
  return (
    /* Root Container */
    <div className="relative flex flex-col min-h-screen bg-slate-900 text-slate-50">
      
      {/* HEADER */}
      <Header className="sticky top-0 z-50 w-full" />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full px-4 py-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-400">
          © 2026 Trust Bank All rights reserved.
        </div>
      </footer>

    <div className="md:hidden">
      <MobileNav />
    </div>

    </div>
  );
};

export default MainLayout;