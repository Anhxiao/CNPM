import { useEffect, useState } from "react";
import notificationService from "../../services/notification.service";
import Loading from "../../components/common/Loading";

const Notification = () => {

    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const response = await notificationService.getNotifications();

            const data = response.data.data;

            setNotifications(
                data.notifications || data || []
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Không thể tải danh sách thông báo."
            );

        } finally {

            setLoading(false);

        }

    };

    const markAsRead = async (id) => {

        try {

            setProcessing(true);

            await notificationService.markAsRead(id);

            await loadNotifications();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Không thể cập nhật thông báo."
            );

        } finally {

            setProcessing(false);

        }

    };

    const deleteNotification = async (id) => {

        if (!window.confirm("Bạn có chắc muốn xóa thông báo này?")) {
            return;
        }

        try {

            setProcessing(true);

            await notificationService.deleteNotification(id);

            await loadNotifications();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Không thể xóa thông báo."
            );

        } finally {

            setProcessing(false);

        }

    };

    if (loading) {
        return <Loading />;
    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Thông báo</h2>

                <button
                    className="btn btn-primary"
                    onClick={loadNotifications}
                    disabled={processing}
                >
                    Làm mới
                </button>

            </div>

            {
                notifications.length === 0 ? (

                    <div className="alert alert-info">
                        Chưa có thông báo nào.
                    </div>

                ) : (

                    notifications.map(notification => (

                        <div
                            key={notification._id}
                            className={`card mb-3 ${
                                notification.isRead
                                    ? ""
                                    : "border-primary"
                            }`}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between">

                                    <div>

                                        <h5 className="mb-2">
                                            {notification.title}
                                        </h5>

                                        <p className="mb-2">
                                            {notification.message}
                                        </p>

                                        <div className="text-muted small">

                                            {
                                                notification.type &&
                                                <>
                                                    <strong>Loại:</strong>{" "}
                                                    {notification.type}
                                                    <br />
                                                </>
                                            }

                                            <strong>Thời gian:</strong>{" "}
                                            {
                                                notification.createdAt
                                                    ? new Date(
                                                        notification.createdAt
                                                    ).toLocaleString()
                                                    : "-"
                                            }

                                        </div>

                                    </div>

                                    <div className="text-end">

                                        {
                                            !notification.isRead && (

                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    disabled={processing}
                                                    onClick={() =>
                                                        markAsRead(notification._id)
                                                    }
                                                >
                                                    Đánh dấu đã đọc
                                                </button>

                                            )
                                        }

                                        <button
                                            className="btn btn-danger btn-sm"
                                            disabled={processing}
                                            onClick={() =>
                                                deleteNotification(notification._id)
                                            }
                                        >
                                            Xóa
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                )
            }

        </div>

    );

};

export default Notification;