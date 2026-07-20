import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

import authService from "../../services/auth.service";

const RegisterForm = () => {

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phone: "",

        password: ""

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

            await authService.register(formData);

            alert("Đăng ký thành công");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Đăng ký thất bại"

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

                label="Email"

                name="email"

                value={formData.email}

                onChange={handleChange}

            />

            <Input

                label="Số điện thoại"

                name="phone"

                value={formData.phone}

                onChange={handleChange}

            />

            <Input

                label="Mật khẩu"

                type="password"

                name="password"

                value={formData.password}

                onChange={handleChange}

            />

            <Button type="submit">

                Đăng ký

            </Button>

        </form>

    );

};

export default RegisterForm;