import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Loading from "../components/common/Loading";

import { useAuthContext } from "../contexts/AuthContext";

const MainLayout = () => {

    const { loading } = useAuthContext();

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="app-layout">

            {/* Sidebar */}

            <Sidebar />

            {/* Main */}

            <div className="main-content">

                {/* Navbar */}

                <Navbar />

                {/* Nội dung */}

                <main className="page-content">

                    <div className="content-wrapper">

                        <Outlet />

                    </div>

                </main>

                {/* Footer */}

                <Footer />

            </div>

        </div>

    );

};

export default MainLayout;