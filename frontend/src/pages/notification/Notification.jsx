import { useEffect, useState } from "react";

import notificationService from "../../services/notification.service";

import Loading from "../../components/common/Loading";

const Notification = () => {

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const response = await notificationService.getNotifications();

            setNotifications(

                response.data.data || []

            );

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể tải thông báo."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const markAsRead = async (id) => {

        try {

            await notificationService.markAsRead(id);

            loadNotifications();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể cập nhật."

            );

        }

    };

    const deleteNotification = async (id) => {

        if (

            !window.confirm(

                "Bạn có chắc muốn xóa thông báo?"

            )

        ) {

            return;

        }

        try {

            await notificationService.deleteNotification(id);

            loadNotifications();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Không thể xóa."

            );

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="container">

            <div className="card">

                <div className="card-header">

                    <h3>

                        Thông báo

                    </h3>

                </div>

                <div className="card-body">

                    {

                        notifications.length === 0 && (

                            <div className="alert alert-info">

                                Chưa có thông báo.

                            </div>

                        )

                    }

                    {

                        notifications.map(item => (

                            <div

                                key={item._id}

                                className={

                                    item.isRead

                                    ?

                                    "card mb-3"

                                    :

                                    "card border-primary mb-3"

                                }

                            >

                                <div className="card-body">

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <h5>

                                                {

                                                    item.title

                                                }

                                            </h5>

                                            <p>

                                                {

                                                    item.message

                                                }

                                            </p>

                                            <small>

                                                {

                                                    new Date(

                                                        item.createdAt

                                                    ).toLocaleString()

                                                }

                                            </small>

                                        </div>

                                        <div>

                                            {

                                                !item.isRead && (

                                                    <button

                                                        className="btn btn-success btn-sm me-2"

                                                        onClick={() =>

                                                            markAsRead(item._id)

                                                        }

                                                    >

                                                        Đã đọc

                                                    </button>

                                                )

                                            }

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>

                                                    deleteNotification(item._id)

                                                }

                                            >

                                                Xóa

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default Notification;