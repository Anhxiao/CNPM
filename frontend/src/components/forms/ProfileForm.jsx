import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

import userService from "../../services/user.service";

const ProfileForm = ({ user }) => {

    const [formData, setFormData] = useState({

        fullName: user?.fullName || "",

        phone: user?.phone || ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await userService.updateProfile(formData);

            alert("Cập nhật thành công");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Có lỗi xảy ra"

            );

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <Input

                label="Họ tên"

                name="fullName"

                value={formData.fullName}

                onChange={handleChange}

            />

            <Input

                label="Số điện thoại"

                name="phone"

                value={formData.phone}

                onChange={handleChange}

            />

            <Button type="submit">

                Cập nhật

            </Button>

        </form>

    );

};

export default ProfileForm;