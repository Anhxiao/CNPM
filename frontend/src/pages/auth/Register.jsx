import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import authService from "../../services/auth.service";

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        fullName: "",

        email: "",

        phone: "",

        password: ""

    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await authService.register(form);

            navigate("/login");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Đăng ký thất bại"

            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center">

                                Đăng ký

                            </h3>

                            {

                                error && (

                                    <div className="alert alert-danger">

                                        {error}

                                    </div>

                                )

                            }

                            <form onSubmit={handleSubmit}>

                                <input

                                    className="form-control mb-3"

                                    placeholder="Họ tên"

                                    name="fullName"

                                    value={form.fullName}

                                    onChange={handleChange}

                                />

                                <input

                                    className="form-control mb-3"

                                    placeholder="Email"

                                    name="email"

                                    type="email"

                                    value={form.email}

                                    onChange={handleChange}

                                />

                                <input

                                    className="form-control mb-3"

                                    placeholder="Số điện thoại"

                                    name="phone"

                                    value={form.phone}

                                    onChange={handleChange}

                                />

                                <input

                                    className="form-control mb-3"

                                    placeholder="Mật khẩu"

                                    name="password"

                                    type="password"

                                    value={form.password}

                                    onChange={handleChange}

                                />

                                <button className="btn btn-success w-100">

                                    Đăng ký

                                </button>

                            </form>

                            <div className="text-center mt-3">

                                <Link to="/login">

                                    Đã có tài khoản?

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Register;