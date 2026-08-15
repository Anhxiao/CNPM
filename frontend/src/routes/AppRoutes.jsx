import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";

import ProjectList from "../pages/project/ProjectList";
import CreateProject from "../pages/project/CreateProject";
import UpdateProject from "../pages/project/UpdateProject";
import ProjectDetail from "../pages/project/ProjectDetail";

import TaskList from "../pages/task/TaskList";
import CreateTask from "../pages/task/CreateTask";
import UpdateTask from "../pages/task/UpdateTask";
import TaskDetail from "../pages/task/TaskDetail";
import Calendar from "../pages/task/Calendar";

import Notification from "../pages/notification/Notification";
import Statistics from "../pages/statistics/Statistics";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";

const AppRoutes = () => {

    return (

        <Routes>

            {/* Public */}

            <Route element={<PublicRoute />}>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

            </Route>

            {/* Private */}

            <Route element={<PrivateRoute />}>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/projects"
                        element={<ProjectList />}
                    />

                    <Route
                        path="/projects/create"
                        element={<CreateProject />}
                    />

                    <Route
                        path="/projects/:id"
                        element={<ProjectDetail />}
                    />

                    <Route
                        path="/projects/edit/:id"
                        element={<UpdateProject />}
                    />

                    <Route
                        path="/tasks"
                        element={<TaskList />}
                    />

                    <Route
                        path="/tasks/create"
                        element={<CreateTask />}
                    />

                    <Route
                        path="/tasks/:id"
                        element={<TaskDetail />}
                    />

                    <Route
                        path="/tasks/edit/:id"
                        element={<UpdateTask />}
                    />

                    <Route
                        path="/calendar"
                        element={<Calendar />}
                    />

                    <Route
                        path="/notifications"
                        element={<Notification />}
                    />

                    <Route
                        path="/statistics"
                        element={<Statistics />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Route>

            </Route>

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>

    );

};

export default AppRoutes;