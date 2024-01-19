import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="body">
      <Navbar />
      <main className="flex-auto bg-gray-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
