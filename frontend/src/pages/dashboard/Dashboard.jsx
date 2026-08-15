import { useEffect, useState } from "react";

import statisticsService from "../../services/statistics.service";
import projectService from "../../services/project.service";
import taskService from "../../services/task.service";
import notificationService from "../../services/notification.service";

import SummaryCard from "../../components/common/SummaryCard";
import Loading from "../../components/common/Loading";
import NotificationList from "../../components/notifications/NotificationList";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({

        totalProjects: 0,

        totalTasks: 0,

        completedTasks: 0,

        overdueTasks: 0

    });

    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadData = async () => {

        setLoading(true);

        try {

            const [

                dashboardRes,

                projectRes,

                taskRes,

                notificationRes

            ] = await Promise.all([

                statisticsService.getDashboardStatistics(),

                projectService.getProjects(),

                taskService.getTasks(),

                notificationService.getNotifications()

            ]);

            setDashboard(

                dashboardRes.data?.data || {

                    totalProjects: 0,

                    totalTasks: 0,

                    completedTasks: 0,

                    overdueTasks: 0

                }

            );

            setProjects(

                projectRes.data?.data || []

            );

            setTasks(

                taskRes.data?.data?.tasks || []

            );

            setNotifications(

                notificationRes.data?.data || []

            );

        }

        catch (error) {

            console.error("Dashboard Error:", error);

            setDashboard({

                totalProjects: 0,

                totalTasks: 0,

                completedTasks: 0,

                overdueTasks: 0

            });

            setProjects([]);

            setTasks([]);

            setNotifications([]);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    const markAsRead = async (id) => {

        try {

            await notificationService.markAsRead(id);

            loadData();

        }

        catch (error) {

            console.error(error);

        }

    };

    const deleteNotification = async (id) => {

        try {

            await notificationService.deleteNotification(id);

            loadData();

        }

        catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Dashboard

            </h2>

            <div className="row">

                <div className="col-md-3">

                    <SummaryCard

                        title="Tổng Project"

                        value={dashboard.totalProjects}

                    />

                </div>

                <div className="col-md-3">

                    <SummaryCard

                        title="Tổng Task"

                        value={dashboard.totalTasks}

                    />

                </div>

                <div className="col-md-3">

                    <SummaryCard

                        title="Đã hoàn thành"

                        value={dashboard.completedTasks}

                    />

                </div>

                <div className="col-md-3">

                    <SummaryCard

                        title="Quá hạn"

                        value={dashboard.overdueTasks}

                    />

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-6">

                    <div className="card">

                        <div className="card-header">

                            Dự án gần đây

                        </div>

                        <div className="card-body">

                            <table className="table table-striped">

                                <thead>

                                    <tr>

                                        <th>Tên dự án</th>

                                        <th>Tiến độ</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        projects.length === 0 ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="2"

                                                    className="text-center"

                                                >

                                                    Chưa có dự án.

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            projects

                                                .slice(0, 5)

                                                .map(project => (

                                                    <tr key={project._id}>

                                                        <td>

                                                            {project.name}

                                                        </td>

                                                        <td>

                                                            {project.progress ?? 0}%

                                                        </td>

                                                    </tr>

                                                ))

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card">

                        <div className="card-header">

                            Công việc sắp đến hạn

                        </div>

                        <div className="card-body">

                            <table className="table table-striped">

                                <thead>

                                    <tr>

                                        <th>Tên công việc</th>

                                        <th>Hạn hoàn thành</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        tasks.length === 0 ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="2"

                                                    className="text-center"

                                                >

                                                    Chưa có công việc.

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            tasks

                                                .slice(0, 5)

                                                .map(task => (

                                                    <tr key={task._id}>

                                                        <td>

                                                            {task.title}

                                                        </td>

                                                        <td>

                                                            {

                                                                task.dueDate

                                                                    ?

                                                                    new Date(

                                                                        task.dueDate

                                                                    ).toLocaleDateString(

                                                                        "vi-VN"

                                                                    )

                                                                    :

                                                                    "-"

                                                            }

                                                        </td>

                                                    </tr>

                                                ))

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header">

                    Thông báo

                </div>

                <div className="card-body">

                    <NotificationList

                        notifications={notifications}

                        onRead={markAsRead}

                        onDelete={deleteNotification}

                    />

                </div>

            </div>

        </div>

    );

};

export default Dashboard;