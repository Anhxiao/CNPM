import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import authService from "../../services/auth.service";
import Loading from "../../components/common/Loading";

const Settings = () => {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({

        fullName: "",

        phone: "",

        email: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await authService.getProfile();

            const user = response.data.data;

            setFormData({

                fullName: user.fullName || "",

                phone: user.phone || "",

                email: user.email || ""

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

            setSaving(true);

            await authService.updateProfile({

                fullName: formData.fullName,

                phone: formData.phone

            });

            toast.success("Cập nhật thành công.");

            loadProfile();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Không thể cập nhật."

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

            <div className="card">

                <div className="card-header">

                    <h3>Cài đặt tài khoản</h3>

                </div>

                <div className="card-body">

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

                                Email

                            </label>

                            <input

                                className="form-control"

                                value={formData.email}

                                disabled

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

                            disabled={saving}

                        >

                            {

                                saving

                                ?

                                "Đang lưu..."

                                :

                                "Lưu thay đổi"

                            }

                        </button>

                    </form>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header">

                    Đổi mật khẩu

                </div>

                <div className="card-body">

                    <div className="alert alert-warning">

                        Chức năng đổi mật khẩu sẽ được bổ sung sau khi backend hỗ trợ API.

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Settings;