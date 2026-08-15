import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import projectService from "../../services/project.service";
import taskService from "../../services/task.service";

const AddTask = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        project: "",
        status: "Todo",
        priority: "Medium",
        startDate: "",
        dueDate: "",
        tags: ""
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoadingProjects(true);
            setError("");

            const response = await projectService.getProjects();

            const responseData = response?.data;

            let projectList = [];

            if (Array.isArray(responseData?.data)) {
                projectList = responseData.data;
            } else if (Array.isArray(responseData)) {
                projectList = responseData;
            }

            setProjects(projectList);
        } catch (err) {
            console.error("Lỗi lấy danh sách dự án:", err);

            setProjects([]);

            setError(
                err?.response?.data?.message ||
                "Không thể tải danh sách dự án."
            );
        } finally {
            setLoadingProjects(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.title.trim()) {
            setError("Vui lòng nhập tên công việc.");
            return;
        }

        if (!formData.project) {
            setError("Vui lòng chọn dự án cho công việc.");
            return;
        }

        if (
            formData.startDate &&
            formData.dueDate &&
            formData.startDate > formData.dueDate
        ) {
            setError(
                "Ngày bắt đầu không được lớn hơn hạn hoàn thành."
            );
            return;
        }

        try {
            setSubmitting(true);

            const taskData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                project: formData.project,
                status: formData.status,
                priority: formData.priority,
                startDate: formData.startDate || null,
                dueDate: formData.dueDate || null,
                tags: formData.tags
                    ? formData.tags
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                    : []
            };

            await taskService.createTask(taskData);

            navigate("/tasks", {
                replace: true
            });
        } catch (err) {
            console.error("Lỗi tạo công việc:", err);

            setError(
                err?.response?.data?.message ||
                "Không thể tạo công việc."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        Thêm công việc
                    </h2>

                    <p className="text-muted mb-0">
                        Tạo công việc mới và gán vào một dự án.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/tasks")}
                >
                    Quay lại
                </button>

            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="card shadow-sm border-0">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-8">

                                <label className="form-label fw-semibold">
                                    Tên công việc
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Nhập tên công việc"
                                    value={formData.title}
                                    onChange={handleChange}
                                    maxLength={200}
                                    required
                                />

                            </div>

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Dự án
                                </label>

                                <select
                                    name="project"
                                    className="form-select"
                                    value={formData.project}
                                    onChange={handleChange}
                                    disabled={
                                        loadingProjects ||
                                        submitting
                                    }
                                    required
                                >

                                    <option value="">
                                        {loadingProjects
                                            ? "Đang tải dự án..."
                                            : projects.length === 0
                                                ? "Chưa có dự án"
                                                : "Chọn dự án"}
                                    </option>

                                    {projects.map((project) => (
                                        <option
                                            key={project._id}
                                            value={project._id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}

                                </select>

                                {!loadingProjects &&
                                    projects.length === 0 && (
                                        <div className="mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() =>
                                                    navigate(
                                                        "/projects/create"
                                                    )
                                                }
                                            >
                                                Tạo dự án mới
                                            </button>
                                        </div>
                                    )}

                            </div>

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Mô tả
                                </label>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Nhập mô tả công việc"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Trạng thái
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                    disabled={submitting}
                                >
                                    <option value="Todo">
                                        Chưa thực hiện
                                    </option>

                                    <option value="In Progress">
                                        Đang thực hiện
                                    </option>

                                    <option value="Review">
                                        Đang kiểm tra
                                    </option>

                                    <option value="Completed">
                                        Hoàn thành
                                    </option>

                                    <option value="Cancelled">
                                        Đã hủy
                                    </option>
                                </select>

                            </div>

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Mức độ ưu tiên
                                </label>

                                <select
                                    name="priority"
                                    className="form-select"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    disabled={submitting}
                                >
                                    <option value="Low">
                                        Thấp
                                    </option>

                                    <option value="Medium">
                                        Trung bình
                                    </option>

                                    <option value="High">
                                        Cao
                                    </option>

                                    <option value="Urgent">
                                        Khẩn cấp
                                    </option>
                                </select>

                            </div>

                            <div className="col-md-4">

                                <label className="form-label fw-semibold">
                                    Tags
                                </label>

                                <input
                                    type="text"
                                    name="tags"
                                    className="form-control"
                                    placeholder="frontend, api"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />

                                <small className="text-muted">
                                    Các tag cách nhau bằng dấu phẩy.
                                </small>

                            </div>

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Ngày bắt đầu
                                </label>

                                <input
                                    type="date"
                                    name="startDate"
                                    className="form-control"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Hạn hoàn thành
                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    className="form-control"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />

                            </div>

                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/tasks")}
                                disabled={submitting}
                            >
                                Hủy
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={
                                    submitting ||
                                    loadingProjects ||
                                    projects.length === 0
                                }
                            >
                                {submitting
                                    ? "Đang tạo..."
                                    : "Tạo công việc"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddTask;