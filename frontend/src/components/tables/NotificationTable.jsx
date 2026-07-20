const NotificationTable = ({

    notifications = [],

    onRead,

    onDelete

}) => {

    return (

        <table className="table">

            <thead>

                <tr>

                    <th>Nội dung</th>

                    <th>Ngày</th>

                    <th>Đã đọc</th>

                    <th></th>

                </tr>

            </thead>

            <tbody>

                {

                    notifications.length === 0 ? (

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center"
                            >

                                Không có thông báo

                            </td>

                        </tr>

                    ) : (

                        notifications.map(notification => (

                            <tr key={notification._id}>

                                <td>

                                    {notification.message}

                                </td>

                                <td>

                                    {

                                        new Date(

                                            notification.createdAt

                                        ).toLocaleString()

                                    }

                                </td>

                                <td>

                                    {

                                        notification.isRead

                                            ? "Đã đọc"

                                            : "Chưa đọc"

                                    }

                                </td>

                                <td>

                                    {

                                        !notification.isRead && (

                                            <button

                                                className="btn btn-success btn-sm"

                                                onClick={() =>
                                                    onRead(notification._id)
                                                }

                                            >

                                                Đánh dấu đã đọc

                                            </button>

                                        )

                                    }

                                    {" "}

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={() =>
                                            onDelete(notification._id)
                                        }

                                    >

                                        Xóa

                                    </button>

                                </td>

                            </tr>

                        ))

                    )

                }

            </tbody>

        </table>

    );

};

export default NotificationTable;