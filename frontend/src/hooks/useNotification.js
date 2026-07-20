import { useEffect, useState } from "react";

import notificationService from "../services/notification.service";

const useNotification = () => {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadNotifications = async () => {

        try {

            const response = await notificationService.getNotifications();

            setNotifications(response.data.data);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadNotifications();

    }, []);

    return {

        loading,

        notifications,

        reload: loadNotifications

    };

};

export default useNotification;