import { transporter } from "../config/mail.js";

class EmailService {

    async sendEmail(to, subject, html) {

        try {

            const info = await transporter.sendMail({

                from: process.env.EMAIL_USER,

                to,

                subject,

                html

            });

            return {

                success: true,

                messageId: info.messageId

            };

        }

        catch (error) {

            throw new Error(error.message);

        }

    }

    async sendWelcomeEmail(user) {

        const html = `

            <h2>Xin chào ${user.fullName}</h2>

            <p>Tài khoản của bạn đã được tạo thành công.</p>

        `;

        return await this.sendEmail(

            user.email,

            "Chào mừng đến với Project Management",

            html

        );

    }

    async sendTaskReminder(user, task) {

        const html = `

            <h2>Nhắc nhở công việc</h2>

            <p>Nhiệm vụ: <b>${task.title}</b></p>

            <p>Hạn hoàn thành: ${task.dueDate}</p>

        `;

        return await this.sendEmail(

            user.email,

            "Nhắc nhở nhiệm vụ",

            html

        );

    }

    async sendResetPassword(user, token) {

        const html = `

            <h2>Đặt lại mật khẩu</h2>

            <p>Token:</p>

            <h3>${token}</h3>

        `;

        return await this.sendEmail(

            user.email,

            "Reset Password",

            html

        );

    }

}

export default new EmailService();