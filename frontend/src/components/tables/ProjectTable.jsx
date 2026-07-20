import { Link } from "react-router-dom";

const ProjectTable = ({

    projects = [],

    onDelete

}) => {

    return (

        <table className="table">

            <thead>

                <tr>

                    <th>Tên dự án</th>

                    <th>Tiến độ</th>

                    <th>Trạng thái</th>

                    <th>Thao tác</th>

                </tr>

            </thead>

            <tbody>

                {

                    projects.length === 0 ? (

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center"
                            >

                                Không có dữ liệu

                            </td>

                        </tr>

                    ) : (

                        projects.map(project => (

                            <tr key={project._id}>

                                <td>

                                    {project.name}

                                </td>

                                <td>

                                    {project.progress}%

                                </td>

                                <td>

                                    {project.status}

                                </td>

                                <td>

                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="btn btn-primary btn-sm"
                                    >

                                        Xem

                                    </Link>

                                    {" "}

                                    <Link
                                        to={`/projects/update/${project._id}`}
                                        className="btn btn-warning btn-sm"
                                    >

                                        Sửa

                                    </Link>

                                    {" "}

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={() =>
                                            onDelete(project._id)
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

    );

};

export default ProjectTable;