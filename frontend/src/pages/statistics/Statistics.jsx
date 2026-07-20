import { useEffect, useState } from "react";

import statisticsService from "../../services/statistics.service";

import Loading from "../../components/common/Loading";

const Statistics = () => {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        totalProjects: 0,

        totalTasks: 0,

        completedTasks: 0,

        overdueTasks: 0,

        progress: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await statisticsService.getDashboard();

            setDashboard(

                response.data.data

            );

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải dữ liệu thống kê."

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Dashboard Statistics

            </h2>

            <div className="row g-3">

                <div className="col-md-3">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <h6>Tổng dự án</h6>

                            <h2>

                                {dashboard.totalProjects}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <h6>Tổng công việc</h6>

                            <h2>

                                {dashboard.totalTasks}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <h6>Đã hoàn thành</h6>

                            <h2>

                                {dashboard.completedTasks}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <h6>Quá hạn</h6>

                            <h2>

                                {dashboard.overdueTasks}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mt-4 shadow-sm">

                <div className="card-body">

                    <h5 className="mb-3">

                        Tiến độ hoàn thành

                    </h5>

                    <div className="progress" style={{ height: "30px" }}>

                        <div

                            className="progress-bar"

                            role="progressbar"

                            style={{

                                width: `${dashboard.progress}%`

                            }}

                            aria-valuenow={dashboard.progress}

                            aria-valuemin="0"

                            aria-valuemax="100"

                        >

                            {dashboard.progress}%

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Statistics;