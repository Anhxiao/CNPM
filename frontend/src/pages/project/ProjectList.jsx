import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import projectService from "../../services/project.service";

import Loading from "../../components/common/Loading";

const ProjectList = () => {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");

    const loadProjects = async () => {

        try {

            const response = await projectService.getProjects();

            setProjects(

                response.data.data || []

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProjects();

    }, []);

    const handleDelete = async (id) => {

        if (

            !window.confirm(

                "Bạn có chắc muốn xóa Project này?"

            )

        ) {

            return;

        }

        try {

            await projectService.deleteProject(id);

            loadProjects();

        }

        catch (error) {

            console.error(error);

        }

    };

    const filteredProjects = projects.filter(project =>

        project.name

            ?.toLowerCase()

            .includes(

                keyword.toLowerCase()

            )

    );

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

            <div className="mb-3">

                <input

                    className="form-control"

                    placeholder="Tìm kiếm Project..."

                    value={keyword}

                    onChange={(e)=>

                        setKeyword(

                            e.target.value

                        )

                    }

                />

            </div>

            <div className="card">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Tên Project</th>

                                <th>Trạng thái</th>

                                <th>Tiến độ</th>

                                <th>Ngày tạo</th>

                                <th width="220">

                                    Thao tác

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredProjects.length === 0 && (

                                    <tr>

                                        <td

                                            colSpan="5"

                                            className="text-center"

                                        >

                                            Không có dữ liệu

                                        </td>

                                    </tr>

                                )

                            }

                            {

                                filteredProjects.map(project => (

                                    <tr

                                        key={project._id}

                                    >

                                        <td>

                                            {project.name}

                                        </td>

                                        <td>

                                            {

                                                project.status

                                            }

                                        </td>

                                        <td>

                                            {

                                                project.progress || 0

                                            }

                                            %

                                        </td>

                                        <td>

                                            {

                                                new Date(

                                                    project.createdAt

                                                ).toLocaleDateString()

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

                                                to={`/projects/update/${project._id}`}

                                                className="btn btn-warning btn-sm me-2"

                                            >

                                                Sửa

                                            </Link>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={()=>

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

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default ProjectList;