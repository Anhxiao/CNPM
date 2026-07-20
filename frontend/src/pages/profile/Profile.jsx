import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import userService from "../../services/user.service";
import Loading from "../../components/common/Loading";

const Profile = () => {
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: ""
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: ""
    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const id = localStorage.getItem("userId");

            if (!id) {

                toast.error("Không tìm thấy thông tin người dùng.");

                setLoading(false);

                return;

            }

            const res = await userService.getUserById(id);

            const data = res.data || res;

            setUser(data);

            setFormData({

                fullName: data.fullName || "",

                phone: data.phone || ""

            });

        } catch (error) {

            toast.error("Không thể tải thông tin người dùng.");

        } finally {

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

        setPasswordData({

            ...passwordData,

            [e.target.name]: e.target.value

        });

    };

    const updateProfile = async (e) => {

        e.preventDefault();

        try {

            await userService.updateUser(

                user._id,

                formData

            );

            toast.success("Cập nhật thành công.");

            loadProfile();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Không thể cập nhật."

            );

        }

    };

    const changePassword = async (e) => {

        e.preventDefault();

        try {

            await userService.changePassword(passwordData);

            toast.success("Đổi mật khẩu thành công.");

            setPasswordData({

                oldPassword: "",

                newPassword: ""

            });

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Đổi mật khẩu thất bại."

            );

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="profile-page">

            <h2>Thông tin cá nhân</h2>

            <div className="profile-container">

                <div className="profile-card">

                    <img

                        src={

                            user.avatar

                                ? user.avatar

                                : "/default-avatar.png"

                        }

                        alt="Avatar"

                        className="profile-avatar"

                    />

                    <p>

                        <strong>Email:</strong>

                        {" "}

                        {user.email}

                    </p>

                    <p>

                        <strong>Vai trò:</strong>

                        {" "}

                        {user.role}

                    </p>

                    <p>

                        <strong>Trạng thái:</strong>

                        {" "}

                        {user.status ? "Hoạt động" : "Khóa"}

                    </p>

                    <p>

                        <strong>Ngày tạo:</strong>

                        {" "}

                        {

                            new Date(

                                user.createdAt

                            ).toLocaleDateString()

                        }

                    </p>

                </div>

                <div className="profile-form">

                    <h3>Cập nhật thông tin</h3>

                    <form onSubmit={updateProfile}>

                        <label>

                            Họ và tên

                        </label>

                        <input

                            type="text"

                            name="fullName"

                            value={formData.fullName}

                            onChange={handleChange}

                        />

                        <label>

                            Số điện thoại

                        </label>

                        <input

                            type="text"

                            name="phone"

                            value={formData.phone}

                            onChange={handleChange}

                        />

                        <button type="submit">

                            Cập nhật

                        </button>

                    </form>

                </div>

                <div className="password-form">

                    <h3>Đổi mật khẩu</h3>

                    <form onSubmit={changePassword}>

                        <label>

                            Mật khẩu cũ

                        </label>

                        <input

                            type="password"

                            name="oldPassword"

                            value={passwordData.oldPassword}

                            onChange={handlePasswordChange}

                        />

                        <label>

                            Mật khẩu mới

                        </label>

                        <input

                            type="password"

                            name="newPassword"

                            value={passwordData.newPassword}

                            onChange={handlePasswordChange}

                        />

                        <button type="submit">

                            Đổi mật khẩu

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default Profile;