import { NavLink } from "react-router-dom";

const Sidebar = () => {

    return (

        <aside className="sidebar">

            <NavLink to="/dashboard">

                Dashboard

            </NavLink>

            <NavLink to="/projects">

                Projects

            </NavLink>

            <NavLink to="/tasks">

                Tasks

            </NavLink>

            <NavLink to="/calendar">

                Calendar

            </NavLink>

            <NavLink to="/notifications">

                Notifications

            </NavLink>

            <NavLink to="/statistics">

                Statistics

            </NavLink>

            <NavLink to="/profile">

                Profile

            </NavLink>

            <NavLink to="/settings">

                Settings

            </NavLink>

        </aside>

    );

};

export default Sidebar;