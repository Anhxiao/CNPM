import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <nav className="navbar">

            <div className="navbar-logo">

                <Link to="/dashboard">

                    Project Management

                </Link>

            </div>

            <div className="navbar-menu">

                <Link to="/dashboard">

                    Dashboard

                </Link>

                <Link to="/projects">

                    Projects

                </Link>

                <Link to="/tasks">

                    Tasks

                </Link>

                <Link to="/statistics">

                    Statistics

                </Link>

                <Link to="/profile">

                    Profile

                </Link>

            </div>

        </nav>

    );

};

export default Navbar;