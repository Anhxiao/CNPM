import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import authService from "../../services/auth.service";
import Loading from "../../components/common/Loading";

const Profile = () => {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({

        fullName: "",

        phone: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await authService.getProfile();

            const profile = response.data.data;

            setUser(profile);

            setFormData({

                fullName: profile.fullName || "",

                phone: profile.phone || ""

            });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Không thể tải thông tin."

            );

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

        try {

            await authService.updateProfile(formData);

            toast.success("Cập nhật thành công.");

            loadProfile();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Không thể cập nhật."

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

                    <h3>Thông tin cá nhân</h3>

                </div>

                <div className="card-body">

                    <div className="text-center mb-4">

                        <img

                            src={

                                user.avatar ||

                                "/default-avatar.png"

                            }

                            alt="Avatar"

                            className="rounded-circle"

                            width="120"

                            height="120"

                        />

                    </div>

                    <table className="table">

                        <tbody>

                            <tr>

                                <th>Email</th>

                                <td>{user.email}</td>

                            </tr>

                            <tr>

                                <th>Vai trò</th>

                                <td>{user.role}</td>

                            </tr>

                            <tr>

                                <th>Ngày tạo</th>

                                <td>

                                    {

                                        user.createdAt

                                        ?

                                        new Date(

                                            user.createdAt

                                        ).toLocaleDateString()

                                        :

                                        "-"

                                    }

                                </td>

                            </tr>

                        </tbody>

                    </table>

                    <hr />

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Họ và tên

                            </label>

                            <input

                                className="form-control"

                                name="fullName"

                                value={formData.fullName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Số điện thoại

                            </label>

                            <input

                                className="form-control"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                            />

                        </div>

                        <button

                            className="btn btn-primary"

                        >

                            Cập nhật

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default Profile;