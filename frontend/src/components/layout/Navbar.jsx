import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuthContext();

    const handleLogout = () => {

        logout();

        navigate("/login", {

            replace: true

        });

    };

    const handleProfile = () => {

        navigate("/profile");

    };

    return (

        <header className="navbar">

            <div className="navbar-left">

                <h2 className="navbar-title">

                    Personal Project Management

                </h2>

            </div>

            <div className="navbar-right">

                <div
                    className="navbar-icon"
                    title="Thông báo"
                    onClick={() => navigate("/notifications")}
                >

                    🔔

                </div>

                <div className="user-box">

                    <img

                        src={
                            user?.avatar
                                ? user.avatar
                                : "/default-avatar.png"
                        }

                        alt="Avatar"

                        className="user-avatar"

                    />

                    <div>

                        <div className="user-name">

                            {

                                user?.fullName ||

                                "Người dùng"

                            }

                        </div>

                        <div className="user-role">

                            {

                                user?.role ||

                                "User"

                            }

                        </div>

                    </div>

                </div>

                <button

                    type="button"

                    className="btn btn-primary"

                    onClick={handleProfile}

                >

                    Hồ sơ

                </button>

                <button

                    type="button"

                    className="btn btn-danger"

                    onClick={handleLogout}

                >

                    Đăng xuất

                </button>

            </div>

        </header>

    );

};

export default Navbar;