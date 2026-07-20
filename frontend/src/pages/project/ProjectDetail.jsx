import { useEffect, useState } from "react";

import {

    Link,

    useNavigate,

    useParams

} from "react-router-dom";

import projectService from "../../services/project.service";

import taskService from "../../services/task.service";

import Loading from "../../components/common/Loading";

const ProjectDetail = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [project, setProject] = useState(null);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const projectResponse =

                await projectService.getProjectById(id);

            setProject(projectResponse.data.data);

            const taskResponse =

                await taskService.getTasks({

                    projectId: id

                });

            setTasks(

                taskResponse.data.data || []

            );

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải dữ liệu."

            );

            navigate("/projects");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loading />;

    }

    const completedTasks =

        tasks.filter(

            task => task.status === "Completed"

        ).length;

    const progress =

        tasks.length === 0

            ? 0

            : Math.round(

                completedTasks * 100 /

                tasks.length

            );

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Chi tiết Project

                </h2>

                <div>

                    <Link

                        to={`/projects/update/${project._id}`}

                        className="btn btn-warning me-2"

                    >

                        Chỉnh sửa

                    </Link>

                    <button

                        className="btn btn-secondary"

                        onClick={() =>

                            navigate("/projects")

                        }

                    >

                        Quay lại

                    </button>

                </div>

            </div>

            <div className="card mb-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <h4>

                                {project.name}

                            </h4>

                            <p>

                                {project.description}

                            </p>

                        </div>

                        <div className="col-md-6">

                            <table className="table">

                                <tbody>

                                    <tr>

                                        <th>

                                            Trạng thái

                                        </th>

                                        <td>

                                            {project.status}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Ngày bắt đầu

                                        </th>

                                        <td>

                                            {

                                                project.startDate

                                                ?

                                                new Date(

                                                    project.startDate

                                                ).toLocaleDateString()

                                                :

                                                "-"

                                            }

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Ngày kết thúc

                                        </th>

                                        <td>

                                            {

                                                project.endDate

                                                ?

                                                new Date(

                                                    project.endDate

                                                ).toLocaleDateString()

                                                :

                                                "-"

                                            }

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Tổng Task

                                        </th>

                                        <td>

                                            {tasks.length}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Hoàn thành

                                        </th>

                                        <td>

                                            {completedTasks}

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mb-4">

                <div className="card-header">

                    <strong>

                        Tiến độ thực hiện

                    </strong>

                </div>

                <div className="card-body">

                    <div className="progress">

                        <div

                            className="progress-bar"

                            role="progressbar"

                            style={{

                                width: `${progress}%`

                            }}

                        >

                            {progress}%

                        </div>

                    </div>

                </div>

            </div>

            <div className="card">

                <div className="card-header d-flex justify-content-between">

                    <strong>

                        Danh sách Task

                    </strong>

                    <Link

                        to="/tasks/create"

                        className="btn btn-primary btn-sm"

                    >

                        + Thêm Task

                    </Link>

                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>

                                    Tên Task

                                </th>

                                <th>

                                    Ưu tiên

                                </th>

                                <th>

                                    Trạng thái

                                </th>

                                <th>

                                    Hạn hoàn thành

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                tasks.length === 0 &&

                                (

                                    <tr>

                                        <td

                                            colSpan="4"

                                            className="text-center"

                                        >

                                            Chưa có Task nào.

                                        </td>

                                    </tr>

                                )

                            }

                            {

                                tasks.map(task => (

                                    <tr

                                        key={task._id}

                                    >

                                        <td>

                                            <Link

                                                to={`/tasks/${task._id}`}

                                            >

                                                {task.title}

                                            </Link>

                                        </td>

                                        <td>

                                            {

                                                task.priority

                                            }

                                        </td>

                                        <td>

                                            {

                                                task.status

                                            }

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

export default ProjectDetail;