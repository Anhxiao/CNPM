import { Link } from "react-router-dom";

const TaskTable = ({

    tasks = [],

    onDelete

}) => {

    return (

        <table className="table">

            <thead>

                <tr>

                    <th>Công việc</th>

                    <th>Dự án</th>

                    <th>Ưu tiên</th>

                    <th>Trạng thái</th>

                    <th>Hạn</th>

                    <th></th>

                </tr>

            </thead>

            <tbody>

                {

                    tasks.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >

                                Không có dữ liệu

                            </td>

                        </tr>

                    ) : (

                        tasks.map(task => (

                            <tr key={task._id}>

                                <td>

                                    {task.title}

                                </td>

                                <td>

                                    {task.project?.name}

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

                                            ? new Date(task.dueDate)

                                                .toLocaleDateString()

                                            : ""

                                    }

                                </td>

                                <td>

                                    <Link

                                        to={`/tasks/${task._id}`}

                                        className="btn btn-primary btn-sm"

                                    >

                                        Chi tiết

                                    </Link>

                                    {" "}

                                    <Link

                                        to={`/tasks/update/${task._id}`}

                                        className="btn btn-warning btn-sm"

                                    >

                                        Sửa

                                    </Link>

                                    {" "}

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={() =>
                                            onDelete(task._id)
                                        }

                                    >

                                        Xóa

                                    </button>

                                </td>

                            </tr>

                        ))

                    )

                }

            </tbody>

        </table>

    );

};

export default TaskTable;