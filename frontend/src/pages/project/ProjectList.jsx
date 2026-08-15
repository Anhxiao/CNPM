import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import projectService from "../../services/project.service";

import Loading from "../../components/common/Loading";

const ProjectList = () => {

    const [projects, setProjects] = useState([]);

    const [filteredProjects, setFilteredProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");

    const loadProjects = async () => {

        setLoading(true);

        try {

            const response = await projectService.getProjects();

            const data = response.data?.data || [];

            setProjects(data);

            setFilteredProjects(data);

        }

        catch (error) {

            console.error("Load Projects Error:", error);

            setProjects([]);

            setFilteredProjects([]);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProjects();

    }, []);

    useEffect(() => {

        const result = projects.filter(project =>

            project.name

                ?.toLowerCase()

                .includes(keyword.toLowerCase())

        );

        setFilteredProjects(result);

    }, [keyword, projects]);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Bạn có chắc muốn xóa Project này?"

        );

        if (!confirmDelete) return;

        try {

            await projectService.deleteProject(id);

            await loadProjects();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Không thể xóa Project."

            );

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Danh sách Project

                </h2>

                <Link

                    to="/projects/create"

                    className="btn btn-primary"

                >

                    + Thêm Project

                </Link>

            </div>

            <div className="mb-4">

                <input

                    type="text"

                    className="form-control"

                    placeholder="Tìm kiếm Project..."

                    value={keyword}

                    onChange={(e) =>

                        setKeyword(e.target.value)

                    }

                />

            </div>

            <div className="card shadow-sm">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead className="table-light">

                            <tr>

                                <th>Tên Project</th>

                                <th>Trạng thái</th>

                                <th>Tiến độ</th>

                                <th>Ngày tạo</th>

                                <th width="240">

                                    Thao tác

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredProjects.length === 0 ?

                                (

                                    <tr>

                                        <td

                                            colSpan="5"

                                            className="text-center text-muted"

                                        >

                                            Chưa có Project nào.

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredProjects.map(project => (

                                        <tr

                                            key={project._id}

                                        >

                                            <td>

                                                {project.name}

                                            </td>

                                            <td>

                                                {

                                                    project.status ||

                                                    "Đang thực hiện"

                                                }

                                            </td>

                                            <td>

                                                {

                                                    project.progress ?? 0

                                                }%

                                            </td>

                                            <td>

                                                {

                                                    project.createdAt

                                                    ?

                                                    new Date(

                                                        project.createdAt

                                                    ).toLocaleDateString(

                                                        "vi-VN"

                                                    )

                                                    :

                                                    "-"

                                                }

                                            </td>

                                            <td>

                                                <Link

                                                    to={`/projects/${project._id}`}

                                                    className="btn btn-info btn-sm me-2"

                                                >

                                                    Chi tiết

                                                </Link>

                                                <Link

                                                    to={`/projects/edit/${project._id}`}

                                                    className="btn btn-warning btn-sm me-2"

                                                >

                                                    Sửa

                                                </Link>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={() =>

                                                        handleDelete(

                                                            project._id

                                                        )

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

                </div>

            </div>

        </div>

    );

};

export default ProjectList;