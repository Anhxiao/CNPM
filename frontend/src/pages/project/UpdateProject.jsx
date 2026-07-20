import { useEffect, useState } from "react";

import {

    useNavigate,

    useParams

} from "react-router-dom";

import projectService from "../../services/project.service";

import Loading from "../../components/common/Loading";

const UpdateProject = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        status: "",

        startDate: "",

        endDate: ""

    });

    useEffect(() => {

        loadProject();

    }, []);

    const loadProject = async () => {

        try {

            const response = await projectService.getProjectById(id);

            const project = response.data.data;

            setFormData({

                name: project.name || "",

                description: project.description || "",

                status: project.status || "Planning",

                startDate: project.startDate
                    ? project.startDate.substring(0, 10)
                    : "",

                endDate: project.endDate
                    ? project.endDate.substring(0, 10)
                    : ""

            });

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải Project."

            );

            navigate("/projects");

        }

        finally {

            setLoading(false);

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

        setSaving(true);

        try {

            await projectService.updateProject(

                id,

                formData

            );

            alert("Cập nhật thành công.");

            navigate("/projects");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể cập nhật Project."

            );

        }

        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card">

                        <div className="card-header">

                            <h4>

                                Cập nhật Project

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

                                        name="name"

                                        className="form-control"

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

                                    <div className="col-md-6">

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

                                <div className="mt-4 d-flex justify-content-end">

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

                                        disabled={saving}

                                    >

                                        {

                                            saving

                                            ? "Đang cập nhật..."

                                            : "Cập nhật"

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

export default UpdateProject;