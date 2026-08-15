import { useEffect, useMemo, useState } from "react";
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

            setLoading(true);

            const response = await taskService.getTasks();

            console.log(response.data);

            setTasks(

                response.data.data.tasks || []

            );

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Không thể tải danh sách công việc."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteTask = async (id) => {

        if (

            !window.confirm(

                "Bạn có chắc muốn xóa công việc này?"

            )

        ) {

            return;

        }

        try {

            await taskService.deleteTask(id);

            await loadTasks();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Không thể xóa công việc."

            );

        }

    };

    const filteredTasks = useMemo(() => {

        return tasks.filter(task => {

            const matchKeyword =

                task.title

                    ?.toLowerCase()

                    .includes(

                        keyword.toLowerCase()

                    );

            const matchStatus =

                status === ""

                ||

                task.status === status;

            const matchPriority =

                priority === ""

                ||

                task.priority === priority;

            return (

                matchKeyword &&

                matchStatus &&

                matchPriority

            );

        });

    }, [

        tasks,

        keyword,

        status,

        priority

    ]);

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

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

                                className="form-control"

                                placeholder="Tìm kiếm Task..."

                                value={keyword}

                                onChange={(e) =>

                                    setKeyword(

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                        <div className="col-md-4">

                            <select

                                className="form-select"

                                value={status}

                                onChange={(e) =>

                                    setStatus(

                                        e.target.value

                                    )

                                }

                            >

                                <option value="">

                                    Tất cả trạng thái

                                </option>

                                <option value="Todo">

                                    Todo

                                </option>

                                <option value="In Progress">

                                    In Progress

                                </option>

                                <option value="Review">

                                    Review

                                </option>

                                <option value="Completed">

                                    Completed

                                </option>

                                <option value="Cancelled">

                                    Cancelled

                                </option>

                            </select>

                        </div>

                        <div className="col-md-4">

                            <select

                                className="form-select"

                                value={priority}

                                onChange={(e) =>

                                    setPriority(

                                        e.target.value

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

                                <th>Tên Task</th>

                                <th>Project</th>

                                <th>Ưu tiên</th>

                                <th>Trạng thái</th>

                                <th>Deadline</th>

                                <th width="220">

                                    Thao tác

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredTasks.length === 0 && (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="text-center text-muted"

                                        >

                                            Không có công việc nào.

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

                                                task.project

                                                    ? task.project.name

                                                    : "-"

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

                                                    ).toLocaleDateString(

                                                        "vi-VN"

                                                    )

                                                    :

                                                    "-"

                                            }

                                        </td>

                                        <td>

                                            <Link

                                                to={`/tasks/${task._id}`}

                                                className="btn btn-info btn-sm me-2"

                                            >

                                                Chi tiết

                                            </Link>

                                            <Link

                                                to={`/tasks/edit/${task._id}`}

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