import "./Notification.css";

const NotificationItem = ({

    notification,

    onRead,

    onDelete

}) => {

    return (

        <div
            className={
                notification.isRead
                    ? "notification-item"
                    : "notification-item unread"
            }
        >

            <div>

                <h5>

                    {notification.title}

                </h5>

                <p>

                    {notification.message}

                </p>

                <small>

                    {

                        new Date(

                            notification.createdAt

                        ).toLocaleString()

                    }

                </small>

            </div>

            <div className="notification-actions">

                {

                    !notification.isRead && (

                        <button

                            className="btn btn-success btn-sm"

                            onClick={() =>
                                onRead(notification._id)
                            }

                        >

                            Đã đọc

                        </button>

                    )

                }

                <button

                    className="btn btn-danger btn-sm"

                    onClick={() =>
                        onDelete(notification._id)
                    }

                >

                    Xóa

                </button>

            </div>

        </div>

    );

};

export default NotificationItem;