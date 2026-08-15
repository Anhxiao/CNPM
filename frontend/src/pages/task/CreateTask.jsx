import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import projectService from "../../services/project.service";
import taskService from "../../services/task.service";

const CreateTask = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        project: "",
        priority: "Medium",
        status: "Todo",
        startDate: "",
        dueDate: ""
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoadingProjects(true);

            const response = await projectService.getProjects();

            const responseData = response?.data;

            let projectList = [];

            if (Array.isArray(responseData)) {
                projectList = responseData;
            } else if (Array.isArray(responseData?.data)) {
                projectList = responseData.data;
            } else if (Array.isArray(responseData?.projects)) {
                projectList = responseData.projects;
            }

            setProjects(projectList);
        } catch (error) {
            console.error("Lỗi lấy danh sách Project:", error);

            alert(
                error?.response?.data?.message ||
                "Không thể tải danh sách dự án."
            );

            setProjects([]);
        } finally {
            setLoadingProjects(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.title.trim()) {
            alert("Vui lòng nhập tên công việc.");
            return;
        }

        if (!formData.project) {
            alert("Vui lòng chọn dự án.");
            return;
        }

        if (
            formData.startDate &&
            formData.dueDate &&
            formData.dueDate < formData.startDate
        ) {
            alert("Hạn hoàn thành phải lớn hơn hoặc bằng ngày bắt đầu.");
            return;
        }

        try {
            setLoading(true);

            const taskData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                project: formData.project,
                priority: formData.priority,
                status: formData.status,
                startDate: formData.startDate || undefined,
                dueDate: formData.dueDate || undefined
            };

            await taskService.createTask(taskData);

            alert("Tạo công việc thành công.");

            navigate("/tasks", {
                replace: true
            });
        } catch (error) {
            console.error("Lỗi tạo Task:", error);

            alert(
                error?.response?.data?.message ||
                "Không thể tạo công việc."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-3">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-9">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white py-3">
                            <h3 className="mb-0">
                                Thêm công việc
                            </h3>

                            <small className="text-muted">
                                Công việc phải thuộc một dự án đã có.
                            </small>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="title"
                                        className="form-label fw-semibold"
                                    >
                                        Tên công việc
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Nhập tên công việc"
                                        maxLength={200}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="description"
                                        className="form-label fw-semibold"
                                    >
                                        Mô tả
                                    </label>

                                    <textarea
                                        id="description"
                                        className="form-control"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Nhập mô tả công việc"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="project"
                                        className="form-label fw-semibold"
                                    >
                                        Dự án
                                    </label>

                                    <select
                                        id="project"
                                        className="form-select"
                                        name="project"
                                        value={formData.project}
                                        onChange={handleChange}
                                        disabled={loadingProjects}
                                        required
                                    >
                                        <option value="">
                                            {loadingProjects
                                                ? "Đang tải danh sách dự án..."
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
                                            <div className="form-text text-danger">
                                                Chưa có dự án nào. Hãy tạo
                                                dự án trước khi thêm công việc.
                                            </div>
                                        )}
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="priority"
                                            className="form-label fw-semibold"
                                        >
                                            Mức độ ưu tiên
                                        </label>

                                        <select
                                            id="priority"
                                            className="form-select"
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
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

                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="status"
                                            className="form-label fw-semibold"
                                        >
                                            Trạng thái
                                        </label>

                                        <select
                                            id="status"
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
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
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="startDate"
                                            className="form-label fw-semibold"
                                        >
                                            Ngày bắt đầu
                                        </label>

                                        <input
                                            id="startDate"
                                            type="date"
                                            className="form-control"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="dueDate"
                                            className="form-label fw-semibold"
                                        >
                                            Hạn hoàn thành
                                        </label>

                                        <input
                                            id="dueDate"
                                            type="date"
                                            className="form-control"
                                            name="dueDate"
                                            value={formData.dueDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/tasks")}
                                        disabled={loading}
                                    >
                                        Hủy
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={
                                            loading ||
                                            loadingProjects ||
                                            projects.length === 0
                                        }
                                    >
                                        {loading
                                            ? "Đang lưu..."
                                            : "Lưu công việc"}
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

export default CreateTask;