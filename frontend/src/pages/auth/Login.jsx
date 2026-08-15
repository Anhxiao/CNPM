import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService from "../../services/auth.service";
import { useAuthContext } from "../../contexts/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuthContext();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (event) => {

        setForm({

            ...form,

            [event.target.name]: event.target.value

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await authService.login(form);

            const data = response.data?.data;

            if (
                !data ||
                !data.user ||
                !data.accessToken ||
                !data.refreshToken
            ) {

                throw new Error("Dữ liệu đăng nhập không hợp lệ.");

            }

            login(

                data.user,

                data.accessToken,

                data.refreshToken

            );

            navigate("/dashboard", {

                replace: true

            });

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                err.message ||

                "Đăng nhập thất bại."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center mb-4">

                                Đăng nhập

                            </h3>

                            {

                                error && (

                                    <div className="alert alert-danger">

                                        {error}

                                    </div>

                                )

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input

                                        type="email"

                                        className="form-control"

                                        name="email"

                                        value={form.email}

                                        onChange={handleChange}

                                        placeholder="Nhập email"

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Mật khẩu

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="password"

                                        value={form.password}

                                        onChange={handleChange}

                                        placeholder="Nhập mật khẩu"

                                        required

                                    />

                                </div>

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ? "Đang đăng nhập..."

                                            : "Đăng nhập"

                                    }

                                </button>

                            </form>

                            <div className="text-center mt-3">

                                <Link to="/forgot-password">

                                    Quên mật khẩu?

                                </Link>

                            </div>

                            <div className="text-center mt-2">

                                <span>

                                    Chưa có tài khoản?{" "}

                                </span>

                                <Link to="/register">

                                    Đăng ký

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;