import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import projectService from "../../services/project.service";

import taskService from "../../services/task.service";

const CreateTask = () => {

    const navigate = useNavigate();

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

        loadProjects();

    }, []);

    const loadProjects = async () => {

        try {

            const response = await projectService.getProjects();

            setProjects(response.data.data || []);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải danh sách Project."

            );

        }

    };

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await taskService.createTask(formData);

            alert("Tạo Task thành công.");

            navigate("/tasks");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tạo Task."

            );

        }

    };

    return (

        <div className="container">

            <div className="card">

                <div className="card-header">

                    <h3>

                        Thêm Task

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

                                        Ưu tiên

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

                                Lưu

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() => navigate("/tasks")}

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

export default CreateTask;