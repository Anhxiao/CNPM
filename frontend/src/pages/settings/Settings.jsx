import { useEffect, useState } from "react";

import userService from "../../services/user.service";

import Loading from "../../components/common/Loading";

const Settings = () => {

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({

        fullName: "",

        phone: "",

        email: ""

    });

    const [password, setPassword] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await userService.getProfile();

            setFormData({

                fullName: response.data.data.fullName || "",

                phone: response.data.data.phone || "",

                email: response.data.data.email || ""

            });

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải thông tin."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handlePasswordChange = (e) => {

        setPassword({

            ...password,

            [e.target.name]: e.target.value

        });

    };

    const updateProfile = async (e) => {

        e.preventDefault();

        try {

            await userService.updateProfile(formData);

            alert("Cập nhật thông tin thành công.");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Cập nhật thất bại."

            );

        }

    };

    const changePassword = async (e) => {

        e.preventDefault();

        if (

            password.newPassword !==

            password.confirmPassword

        ) {

            alert("Xác nhận mật khẩu không khớp.");

            return;

        }

        try {

            await userService.changePassword(password);

            alert("Đổi mật khẩu thành công.");

            setPassword({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Đổi mật khẩu thất bại."

            );

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Cài đặt tài khoản

            </h2>

            <div className="row">

                <div className="col-md-6">

                    <div className="card shadow-sm mb-4">

                        <div className="card-header">

                            Thông tin cá nhân

                        </div>

                        <div className="card-body">

                            <form onSubmit={updateProfile}>

                                <div className="mb-3">

                                    <label>

                                        Họ tên

                                    </label>

                                    <input

                                        className="form-control"

                                        name="fullName"

                                        value={formData.fullName}

                                        onChange={handleChange}

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Email

                                    </label>

                                    <input

                                        className="form-control"

                                        value={formData.email}

                                        disabled

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

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

                                    Lưu thay đổi

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow-sm">

                        <div className="card-header">

                            Đổi mật khẩu

                        </div>

                        <div className="card-body">

                            <form onSubmit={changePassword}>

                                <div className="mb-3">

                                    <label>

                                        Mật khẩu hiện tại

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="currentPassword"

                                        value={password.currentPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Mật khẩu mới

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="newPassword"

                                        value={password.newPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Xác nhận mật khẩu

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="confirmPassword"

                                        value={password.confirmPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </div>

                                <button

                                    className="btn btn-success"

                                >

                                    Đổi mật khẩu

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Settings;