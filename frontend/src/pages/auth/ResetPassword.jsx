import { useState } from "react";

const ResetPassword = () => {

    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        alert(

            "Backend chưa hỗ trợ Reset Password."

        );

    };

    return (

        <div className="container mt-5">

            <div className="card">

                <div className="card-body">

                    <h3>Đặt lại mật khẩu</h3>

                    <form onSubmit={handleSubmit}>

                        <input

                            className="form-control mb-3"

                            type="password"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                            placeholder="Mật khẩu mới"

                        />

                        <button className="btn btn-success">

                            Xác nhận

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default ResetPassword;