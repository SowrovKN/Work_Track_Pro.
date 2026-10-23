/* eslint react/prop-types: off */
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
