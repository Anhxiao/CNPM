const roleMiddleware = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Chưa xác thực người dùng."

            });

        }

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message: "Bạn không có quyền truy cập."

            });

        }

        next();

    };

};

export default roleMiddleware;