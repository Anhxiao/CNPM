import { useEffect, useState } from "react";

import statisticsService from "../../services/statistics.service";
import projectService from "../../services/project.service";
import taskService from "../../services/task.service";
import notificationService from "../../services/notification.service";

import SummaryCard from "../../components/common/SummaryCard";
import Loading from "../../components/common/Loading";
import NotificationList from "../../components/notifications/NotificationList";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadData = async () => {

        try {

            const [

                dashboardRes,

                projectRes,

                taskRes,

                notificationRes

            ] = await Promise.all([

                statisticsService.getDashboard(),

                projectService.getProjects(),

                taskService.getTasks(),

                notificationService.getNotifications()

            ]);

            setDashboard(

                dashboardRes.data.data

            );

            setProjects(

                projectRes.data.data || []

            );

            setTasks(

                taskRes.data.data || []

            );

            setNotifications(

                notificationRes.data.data || []

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    const markAsRead = async (id) => {

        await notificationService.markAsRead(id);

        loadData();

    };

    const deleteNotification = async (id) => {

        await notificationService.deleteNotification(id);

        loadData();

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

                        value={dashboard?.totalProjects || 0}

                    />

                </div>

                <div className="col-md-3">

                    <SummaryCard

                        title="Tổng Task"

                        value={dashboard?.totalTasks || 0}

                    />

                </div>

                <div className="col-md-3">

                    <SummaryCard

                        title="Đã hoàn thành"

                        value={dashboard?.completedTasks || 0}

                    />

                </div>

                <div className="col-md-3">

                    <SummaryCard

                        title="Quá hạn"

                        value={dashboard?.overdueTasks || 0}

                    />

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-6">

                    <div className="card">

                        <div className="card-header">

                            Project gần đây

                        </div>

                        <div className="card-body">

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>Tên</th>

                                        <th>Tiến độ</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        projects.slice(0,5).map(project=>(

                                            <tr key={project._id}>

                                                <td>

                                                    {project.name}

                                                </td>

                                                <td>

                                                    {

                                                        project.progress || 0

                                                    }%

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card">

                        <div className="card-header">

                            Task sắp đến hạn

                        </div>

                        <div className="card-body">

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>Tên</th>

                                        <th>Deadline</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        tasks

                                        .slice(0,5)

                                        .map(task=>(

                                            <tr key={task._id}>

                                                <td>

                                                    {task.title}

                                                </td>

                                                <td>

                                                    {

                                                        task.dueDate ?

                                                        new Date(task.dueDate)

                                                        .toLocaleDateString()

                                                        : "-"

                                                    }

                                                </td>

                                            </tr>

                                        ))

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