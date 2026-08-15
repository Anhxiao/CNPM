import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import projectLogo from "../../assets/images/project-logo.png";
import avatarDefault from "../../assets/images/avatar.png";

const Sidebar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuthContext();

    const handleLogout = () => {

        logout();

        navigate("/login", {
            replace: true
        });

    };

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <img
                    src={
                        user?.avatar
                            ? user.avatar
                            : "/default-avatar.png"
                    }
                    alt="Avatar"
                    className="user-avatar"
                />

                <h3>

                    Project Management

                </h3>

                <p>

                    {

                        user?.fullName ||

                        "Người dùng"

                    }

                </p>

            </div>

            <nav className="sidebar-menu">

                <ul>

                    <li>

                        <NavLink to="/dashboard">

                            Dashboard

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/projects">

                            Danh sách dự án

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/projects/create">

                            Thêm dự án

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/tasks">

                            Danh sách công việc

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/tasks/create">

                            Thêm công việc

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/calendar">

                            Lịch

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/statistics">

                            Thống kê

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/notifications">

                            Thông báo

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/profile">

                            Hồ sơ

                        </NavLink>

                    </li>

                    <li>

                        <NavLink to="/settings">

                            Cài đặt

                        </NavLink>

                    </li>

                </ul>

            </nav>

            <div className="sidebar-footer">

                <button

                    type="button"

                    className="btn btn-danger"

                    onClick={handleLogout}

                >

                    Đăng xuất

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;