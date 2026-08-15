import { useState } from "react";
import { useNavigate } from "react-router-dom";

import projectService from "../../services/project.service";

const CreateProject = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        status: "Planning",

        startDate: "",

        endDate: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.name.trim()) {

            setError("Tên Project không được để trống.");

            return;

        }

        if (

            formData.startDate &&

            formData.endDate &&

            new Date(formData.startDate) >

            new Date(formData.endDate)

        ) {

            setError("Ngày kết thúc phải sau ngày bắt đầu.");

            return;

        }

        try {

            setLoading(true);

            await projectService.createProject(formData);

            navigate("/projects");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Không thể tạo Project."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-4">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow">

                        <div className="card-header">

                            <h4 className="mb-0">

                                Thêm Project

                            </h4>

                        </div>

                        <div className="card-body">

                            {

                                error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Tên Project

                                    </label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        name="name"

                                        value={formData.name}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Mô tả

                                    </label>

                                    <textarea

                                        rows="5"

                                        className="form-control"

                                        name="description"

                                        value={formData.description}

                                        onChange={handleChange}

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Trạng thái

                                    </label>

                                    <select

                                        className="form-select"

                                        name="status"

                                        value={formData.status}

                                        onChange={handleChange}

                                    >

                                        <option value="Planning">

                                            Planning

                                        </option>

                                        <option value="In Progress">

                                            In Progress

                                        </option>

                                        <option value="Completed">

                                            Completed

                                        </option>

                                    </select>

                                </div>

                                <div className="row">

                                    <div className="col-md-6">

                                        <div className="mb-3">

                                            <label className="form-label">

                                                Ngày bắt đầu

                                            </label>

                                            <input

                                                type="date"

                                                className="form-control"

                                                name="startDate"

                                                value={formData.startDate}

                                                onChange={handleChange}

                                            />

                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <div className="mb-3">

                                            <label className="form-label">

                                                Ngày kết thúc

                                            </label>

                                            <input

                                                type="date"

                                                className="form-control"

                                                name="endDate"

                                                value={formData.endDate}

                                                onChange={handleChange}

                                            />

                                        </div>

                                    </div>

                                </div>

                                <div className="d-flex justify-content-end">

                                    <button

                                        type="button"

                                        className="btn btn-secondary me-2"

                                        onClick={() => navigate("/projects")}

                                        disabled={loading}

                                    >

                                        Hủy

                                    </button>

                                    <button

                                        type="submit"

                                        className="btn btn-primary"

                                        disabled={loading}

                                    >

                                        {

                                            loading

                                                ? "Đang lưu..."

                                                : "Lưu Project"

                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CreateProject;