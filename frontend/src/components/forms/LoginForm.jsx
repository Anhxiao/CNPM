import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";

import authService from "../../services/auth.service";

const LoginForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await authService.login(formData);

            localStorage.setItem(

                "accessToken",

                response.data.accessToken

            );

            navigate("/dashboard");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Đăng nhập thất bại"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <Input

                label="Email"

                name="email"

                value={formData.email}

                onChange={handleChange}

            />

            <Input

                label="Mật khẩu"

                type="password"

                name="password"

                value={formData.password}

                onChange={handleChange}

            />

            <Button

                type="submit"

                disabled={loading}

            >

                {loading ? "Đang đăng nhập..." : "Đăng nhập"}

            </Button>

        </form>

    );

};

export default LoginForm;