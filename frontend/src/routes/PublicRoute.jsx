import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import Loading from "../components/common/Loading";

const PublicRoute = () => {

    const {

        loading,

        isAuthenticated

    } = useAuthContext();

    if (loading) {

        return <Loading />;

    }

    if (isAuthenticated) {

        return (

            <Navigate

                to="/dashboard"

                replace

            />

        );

    }

    return <Outlet />;

};

export default PublicRoute;