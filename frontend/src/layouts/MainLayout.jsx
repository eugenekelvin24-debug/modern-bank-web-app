import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Footer from "../components/Footer";

const MainLayout = () => {

  return (
    /* Root Container */
    <div className="relative flex flex-col min-h-screen bg-slate-900 text-slate-50 pb-20 md:pb-0">
    
      
      {/* HEADER */}
      <Header className="sticky top-0 z-50 w-full" />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full px-4 py-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <div>
        <Footer />
      </div>
      
    <div className="md:hidden">
      <MobileNav />
    </div>

    </div>
  );
};

export default MainLayout;