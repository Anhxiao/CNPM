import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import taskService from "../../services/task.service";

import Loading from "../../components/common/Loading";

const TaskList = () => {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");

    const [status, setStatus] = useState("");

    const [priority, setPriority] = useState("");

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const response = await taskService.getTasks();

            setTasks(response.data.data || []);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải danh sách Task."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteTask = async (id) => {

        if (!window.confirm("Bạn có chắc muốn xóa Task?")) {

            return;

        }

        try {

            await taskService.deleteTask(id);

            loadTasks();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể xóa Task."

            );

        }

    };

    const filteredTasks = tasks.filter(task => {

        const matchKeyword =

            task.title

                ?.toLowerCase()

                .includes(keyword.toLowerCase());

        const matchStatus =

            status === ""

            ||

            task.status === status;

        const matchPriority =

            priority === ""

            ||

            task.priority === priority;

        return (

            matchKeyword

            &&

            matchStatus

            &&

            matchPriority

        );

    });

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between mb-4">

                <h2>

                    Danh sách Task

                </h2>

                <Link

                    to="/tasks/create"

                    className="btn btn-primary"

                >

                    + Thêm Task

                </Link>

            </div>

            <div className="card mb-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4">

                            <input

                                type="text"

                                className="form-control"

                                placeholder="Tìm Task"

                                value={keyword}

                                onChange={(event) =>

                                    setKeyword(

                                        event.target.value

                                    )

                                }

                            />

                        </div>

                        <div className="col-md-4">

                            <select

                                className="form-select"

                                value={status}

                                onChange={(event) =>

                                    setStatus(

                                        event.target.value

                                    )

                                }

                            >

                                <option value="">

                                    Tất cả trạng thái

                                </option>

                                <option value="Pending">

                                    Pending

                                </option>

                                <option value="In Progress">

                                    In Progress

                                </option>

                                <option value="Completed">

                                    Completed

                                </option>

                            </select>

                        </div>

                        <div className="col-md-4">

                            <select

                                className="form-select"

                                value={priority}

                                onChange={(event) =>

                                    setPriority(

                                        event.target.value

                                    )

                                }

                            >

                                <option value="">

                                    Tất cả ưu tiên

                                </option>

                                <option value="Low">

                                    Low

                                </option>

                                <option value="Medium">

                                    Medium

                                </option>

                                <option value="High">

                                    High

                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead>

                            <tr>

                                <th>

                                    Tên Task

                                </th>

                                <th>

                                    Project

                                </th>

                                <th>

                                    Ưu tiên

                                </th>

                                <th>

                                    Trạng thái

                                </th>

                                <th>

                                    Hạn

                                </th>

                                <th>

                                    Thao tác

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredTasks.length === 0 &&

                                (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="text-center"

                                        >

                                            Không có dữ liệu.

                                        </td>

                                    </tr>

                                )

                            }

                            {

                                filteredTasks.map(task => (

                                    <tr

                                        key={task._id}

                                    >

                                        <td>

                                            {task.title}

                                        </td>

                                        <td>

                                            {

                                                task.project?.name ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {task.priority}

                                        </td>

                                        <td>

                                            {task.status}

                                        </td>

                                        <td>

                                            {

                                                task.dueDate

                                                ?

                                                new Date(

                                                    task.dueDate

                                                ).toLocaleDateString()

                                                :

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            <Link

                                                to={`/tasks/${task._id}`}

                                                className="btn btn-info btn-sm me-2"

                                            >

                                                Xem

                                            </Link>

                                            <Link

                                                to={`/tasks/update/${task._id}`}

                                                className="btn btn-warning btn-sm me-2"

                                            >

                                                Sửa

                                            </Link>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>

                                                    deleteTask(task._id)

                                                }

                                            >

                                                Xóa

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default TaskList;