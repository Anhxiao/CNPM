let notificationInterval = null;

export const startNotificationJob = () => {

    if (notificationInterval) {

        console.log("Notification Job already running.");

        return;

    }

    console.log("Notification Job Started.");

    notificationInterval = setInterval(async () => {

        try {

            console.log("Checking notifications...");

            // TODO:
            // Kiểm tra các Task sắp hết hạn
            // Tạo Notification
            // Gửi Email nếu cần

        } catch (error) {

            console.error("Notification Job Error:", error.message);

        }

    }, 60000);

};

export const stopNotificationJob = () => {

    if (notificationInterval) {

        clearInterval(notificationInterval);

        notificationInterval = null;

        console.log("Notification Job Stopped.");

    }

};