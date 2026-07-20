import { useState } from "react";

import { useNavigate } from "react-router-dom";

import projectService from "../../services/project.service";

const CreateProject = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        status: "Planning",

        startDate: "",

        endDate: ""

    });

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {

            await projectService.createProject(formData);

            alert("Tạo Project thành công.");

            navigate("/projects");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tạo Project."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card">

                        <div className="card-header">

                            <h4>

                                Thêm Project

                            </h4>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>

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

                                    <label>

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

                                    <label>

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

                                            <label>

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

                                            <label>

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