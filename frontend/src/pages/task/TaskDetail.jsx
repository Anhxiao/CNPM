import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import taskService from "../../services/task.service";
import Loading from "../../components/common/Loading";

const TaskDetail = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [task, setTask] = useState(null);

    const loadTask = async () => {

        try {

            const response = await taskService.getTask(id);

            setTask(response.data.data);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải Task."

            );

            navigate("/tasks");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTask();

    }, []);

    const handleDelete = async () => {

        if (!window.confirm("Bạn có chắc muốn xóa Task này?")) {

            return;

        }

        try {

            await taskService.deleteTask(id);

            alert("Xóa thành công.");

            navigate("/tasks");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể xóa."

            );

        }

    };

    const handleComplete = async () => {

        try {

            await taskService.updateTask(id, {

                status: "Completed"

            });

            loadTask();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể cập nhật."

            );

        }

    };

    if (loading) {

        return <Loading />;

    }

    if (!task) {

        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    Không tìm thấy Task.

                </div>

            </div>

        );

    }

    return (

        <div className="container">

            <div className="card">

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h3>

                        Chi tiết Task

                    </h3>

                    <div>

                        <button
                            className="btn btn-secondary me-2"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>

                        <Link
                            to={`/tasks/edit/${task._id}`}
                            className="btn btn-warning me-2"
                        >
                            Chỉnh sửa
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Xóa
                        </button>

                    </div>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>

                                <th width="220">

                                    Tên Task

                                </th>

                                <td>

                                    {task.title}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Mô tả

                                </th>

                                <td>

                                    {task.description || "-"}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Project

                                </th>

                                <td>

                                    {task.project?.name || "-"}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Trạng thái

                                </th>

                                <td>

                                    {task.status}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Ưu tiên

                                </th>

                                <td>

                                    {task.priority}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Người tạo

                                </th>

                                <td>

                                    {task.creator?.fullName || "-"}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Người được giao

                                </th>

                                <td>

                                    {task.assignee?.fullName || "-"}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Ngày bắt đầu

                                </th>

                                <td>

                                    {

                                        task.startDate

                                        ?

                                        new Date(task.startDate)

                                            .toLocaleDateString()

                                        :

                                        "-"

                                    }

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Hạn hoàn thành

                                </th>

                                <td>

                                    {

                                        task.dueDate

                                        ?

                                        new Date(task.dueDate)

                                            .toLocaleDateString()

                                        :

                                        "-"

                                    }

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Hoàn thành lúc

                                </th>

                                <td>

                                    {

                                        task.completedAt

                                        ?

                                        new Date(task.completedAt)

                                            .toLocaleString()

                                        :

                                        "-"

                                    }

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Tiến độ

                                </th>

                                <td>

                                    {task.progress || 0}%

                                </td>

                            </tr>

                        </tbody>

                    </table>

                    {

                        task.status !== "Completed" && (

                            <button

                                className="btn btn-success"

                                onClick={handleComplete}

                            >

                                Đánh dấu hoàn thành

                            </button>

                        )

                    }

                </div>

            </div>

        </div>

    );

};

export default TaskDetail;