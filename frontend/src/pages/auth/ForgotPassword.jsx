import { useState } from "react";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        alert(

            "Backend chưa hỗ trợ Forgot Password."

        );

    };

    return (

        <div className="container mt-5">

            <div className="card">

                <div className="card-body">

                    <h3>Quên mật khẩu</h3>

                    <form onSubmit={handleSubmit}>

                        <input

                            className="form-control mb-3"

                            type="email"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                            placeholder="Nhập Email"

                        />

                        <button className="btn btn-primary">

                            Gửi yêu cầu

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default ForgotPassword;