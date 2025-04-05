import { Outlet } from "react-router-dom";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import DetailTop from "@/assets/images/detail-top.png";
import DetailBottom from "@/assets/images/detail-bottom.png";
import "./styles.scss";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <div className="user-layout__background">
        <img src={DetailTop} className="detail-top" alt="Detail Top" />
        <img src={DetailBottom} className="detail-bottom" alt="Detail Bottom" />
      </div>

      <Header />
      <main className="user-layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
