import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {

    return (

        <div className="main-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <main className="page-content">

                    <Outlet />

                </main>

                <Footer />

            </div>

        </div>

    );

};

export default MainLayout;