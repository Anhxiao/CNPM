import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import authService from "../../services/auth.service";

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await authService.login(form);

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Đăng nhập thất bại"

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

                                    <label>Email</label>

                                    <input

                                        className="form-control"

                                        name="email"

                                        type="email"

                                        value={form.email}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Mật khẩu</label>

                                    <input

                                        className="form-control"

                                        name="password"

                                        type="password"

                                        value={form.password}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <button

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

                            <div className="mt-3 text-center">

                                <Link to="/forgot-password">

                                    Quên mật khẩu?

                                </Link>

                            </div>

                            <div className="text-center mt-2">

                                <Link to="/register">

                                    Chưa có tài khoản?

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