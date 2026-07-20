import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <section className="dashboard-page">

                    <Outlet />

                </section>

            </div>

        </div>

    );

};

export default DashboardLayout;