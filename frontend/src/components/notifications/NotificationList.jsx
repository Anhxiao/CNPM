import NotificationItem from "./NotificationItem";

const NotificationList = ({

    notifications,

    onRead,

    onDelete

}) => {

    if (!notifications.length) {

        return (

            <div className="text-center">

                Không có thông báo.

            </div>

        );

    }

    return (

        <div>

            {

                notifications.map(notification => (

                    <NotificationItem

                        key={notification._id}

                        notification={notification}

                        onRead={onRead}

                        onDelete={onDelete}

                    />

                ))

            }

        </div>

    );

};

export default NotificationList;