import { useEffect, useState } from "react";

import calendarService from "../../services/calendar.service";

import Loading from "../../components/common/Loading";

const Calendar = () => {

    const [loading, setLoading] = useState(true);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadCalendar();

    }, []);

    const loadCalendar = async () => {

        try {

            const response = await calendarService.getCalendar();

            setTasks(response.data.data || []);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải dữ liệu."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const getBadgeColor = (priority) => {

        switch (priority) {

            case "High":

                return "danger";

            case "Medium":

                return "warning";

            case "Low":

                return "success";

            default:

                return "secondary";

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container">

            <div className="card">

                <div className="card-header">

                    <h3>

                        Lịch công việc

                    </h3>

                </div>

                <div className="card-body">

                    {

                        tasks.length === 0 && (

                            <div className="alert alert-info">

                                Không có công việc nào.

                            </div>

                        )

                    }

                    {

                        tasks.map(task => (

                            <div

                                key={task._id}

                                className="card mb-3"

                            >

                                <div className="card-body">

                                    <div className="d-flex justify-content-between">

                                        <h5>

                                            {task.title}

                                        </h5>

                                        <span

                                            className={`badge bg-${getBadgeColor(task.priority)}`}

                                        >

                                            {task.priority}

                                        </span>

                                    </div>

                                    <p>

                                        {

                                            task.description ||

                                            "Không có mô tả."

                                        }

                                    </p>

                                    <div className="row">

                                        <div className="col-md-4">

                                            <strong>

                                                Project

                                            </strong>

                                            <br />

                                            {

                                                task.project?.name ||

                                                "-"

                                            }

                                        </div>

                                        <div className="col-md-3">

                                            <strong>

                                                Bắt đầu

                                            </strong>

                                            <br />

                                            {

                                                task.startDate

                                                ?

                                                new Date(

                                                    task.startDate

                                                ).toLocaleDateString()

                                                :

                                                "-"

                                            }

                                        </div>

                                        <div className="col-md-3">

                                            <strong>

                                                Hạn

                                            </strong>

                                            <br />

                                            {

                                                task.dueDate

                                                ?

                                                new Date(

                                                    task.dueDate

                                                ).toLocaleDateString()

                                                :

                                                "-"

                                            }

                                        </div>

                                        <div className="col-md-2">

                                            <strong>

                                                Trạng thái

                                            </strong>

                                            <br />

                                            {task.status}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default Calendar;