const NotificationBadge = ({

    notifications = []

}) => {

    const unread = notifications.filter(

        item => !item.isRead

    ).length;

    if (unread === 0) {

        return null;

    }

    return (

        <span className="badge bg-danger">

            {unread}

        </span>

    );

};

export default NotificationBadge;