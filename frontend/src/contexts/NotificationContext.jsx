import {

    createContext,

    useContext,

    useState

} from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);

    const addNotification = (

        message,

        type = "success"

    ) => {

        const notification = {

            id: Date.now(),

            message,

            type

        };

        setNotifications(

            (prev) => [

                ...prev,

                notification

            ]

        );

        setTimeout(() => {

            removeNotification(

                notification.id

            );

        }, 3000);

    };

    const removeNotification = (id) => {

        setNotifications(

            (prev) =>

                prev.filter(

                    (item) =>

                        item.id !== id

                )

        );

    };

    return (

        <NotificationContext.Provider

            value={{

                notifications,

                addNotification,

                removeNotification

            }}

        >

            {children}

        </NotificationContext.Provider>

    );

};

export const useNotificationContext = () => {

    return useContext(

        NotificationContext

    );

};

export default NotificationContext;