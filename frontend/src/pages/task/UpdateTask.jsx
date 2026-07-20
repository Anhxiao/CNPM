import { useEffect, useState } from "react";

import {

    useNavigate,

    useParams

} from "react-router-dom";

import taskService from "../../services/task.service";

import projectService from "../../services/project.service";

import Loading from "../../components/common/Loading";

const UpdateTask = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [projects, setProjects] = useState([]);

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        projectId: "",

        priority: "Medium",

        status: "Pending",

        startDate: "",

        dueDate: ""

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [

                projectResponse,

                taskResponse

            ] = await Promise.all([

                projectService.getProjects(),

                taskService.getTaskById(id)

            ]);

            setProjects(

                projectResponse.data.data || []

            );

            const task = taskResponse.data.data;

            setFormData({

                title: task.title || "",

                description: task.description || "",

                projectId:

                    task.project?._id ||

                    task.project ||

                    "",

                priority:

                    task.priority ||

                    "Medium",

                status:

                    task.status ||

                    "Pending",

                startDate:

                    task.startDate

                    ?

                    task.startDate.substring(0, 10)

                    :

                    "",

                dueDate:

                    task.dueDate

                    ?

                    task.dueDate.substring(0, 10)

                    :

                    ""

            });

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải dữ liệu."

            );

            navigate("/tasks");

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]:

                event.target.value

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await taskService.updateTask(

                id,

                formData

            );

            alert(

                "Cập nhật Task thành công."

            );

            navigate("/tasks");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể cập nhật Task."

            );

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

                        Cập nhật Task

                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Tên Task

                            </label>

                            <input

                                type="text"

                                name="title"

                                className="form-control"

                                value={formData.title}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Mô tả

                            </label>

                            <textarea

                                name="description"

                                className="form-control"

                                rows="4"

                                value={formData.description}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Project

                            </label>

                            <select

                                name="projectId"

                                className="form-select"

                                value={formData.projectId}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Chọn Project

                                </option>

                                {

                                    projects.map(project => (

                                        <option

                                            key={project._id}

                                            value={project._id}

                                        >

                                            {project.name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="row">

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">

                                        Mức ưu tiên

                                    </label>

                                    <select

                                        name="priority"

                                        className="form-select"

                                        value={formData.priority}

                                        onChange={handleChange}

                                    >

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

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">

                                        Trạng thái

                                    </label>

                                    <select

                                        name="status"

                                        className="form-select"

                                        value={formData.status}

                                        onChange={handleChange}

                                    >

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

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">

                                        Ngày bắt đầu

                                    </label>

                                    <input

                                        type="date"

                                        name="startDate"

                                        className="form-control"

                                        value={formData.startDate}

                                        onChange={handleChange}

                                    />

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">

                                        Hạn hoàn thành

                                    </label>

                                    <input

                                        type="date"

                                        name="dueDate"

                                        className="form-control"

                                        value={formData.dueDate}

                                        onChange={handleChange}

                                    />

                                </div>

                            </div>

                        </div>

                        <div className="d-flex gap-2">

                            <button

                                type="submit"

                                className="btn btn-success"

                            >

                                Cập nhật

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() =>

                                    navigate("/tasks")

                                }

                            >

                                Hủy

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default UpdateTask;