import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import Loading from "../components/common/Loading";

const PrivateRoute = () => {

    const {

        loading,

        isAuthenticated

    } = useAuthContext();

    if (loading) {

        return <Loading />;

    }

    if (!isAuthenticated) {

        return (

            <Navigate

                to="/login"

                replace

            />

        );

    }

    return <Outlet />;

};

export default PrivateRoute;