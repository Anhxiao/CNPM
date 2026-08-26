# Hệ thống quản lý dự án cá nhân
# Phát thảo dự án
## 1.1 Khảo sát và phân tích yêu cầu
### 1.1.1 Khảo sát hiện trạng
Trong quá trình học tập và làm việc, mỗi cá nhân thường phải thực hiện đồng thời nhiều dự án hoặc công việc với các mức độ ưu tiên và thời hạn khác nhau. Tuy nhiên, việc quản lý các công việc này vẫn chủ yếu dựa vào sổ ghi chép, bảng tính Excel hoặc các ứng dụng ghi chú đơn giản. Những phương pháp này tuy dễ sử dụng nhưng còn tồn tại nhiều hạn chế như khó theo dõi tiến độ, không có khả năng thống kê tổng quan, thiếu tính nhắc nhở và khó quản lý khi số lượng công việc ngày càng tăng.
Bên cạnh đó, nhiều hệ thống quản lý dự án hiện nay được thiết kế dành cho doanh nghiệp hoặc nhóm làm việc nên có nhiều chức năng phức tạp, yêu cầu cấu hình cao và không thật sự phù hợp với nhu cầu của người dùng cá nhân. Người sử dụng chỉ cần một hệ thống đơn giản nhưng vẫn đáp ứng đầy đủ các chức năng quản lý dự án, quản lý công việc, theo dõi tiến độ và thống kê kết quả thực hiện.
Xuất phát từ những nhu cầu trên, đề tài “Hệ thống quản lý dự án cá nhân” được xây dựng nhằm hỗ trợ người dùng quản lý toàn bộ dự án và công việc trên một nền tảng duy nhất. Hệ thống giúp người dùng lập kế hoạch, theo dõi tiến độ, quản lý thời gian, sắp xếp mức độ ưu tiên và đánh giá hiệu quả làm việc thông qua các báo cáo trực quan.
### 1.1.2 Xác định đối tượng sử dụng
Đối tượng sử dụng của hệ thống là những người có nhu cầu quản lý công việc cá nhân, bao gồm:

- Sinh viên quản lý đồ án, bài tập lớn, kế hoạch học tập.
- Nhân viên văn phòng theo dõi các công việc hằng ngày.
- Freelancer quản lý nhiều dự án của khách hàng.
- Người làm việc tự do có nhu cầu lập kế hoạch và theo dõi tiến độ công việc. <br>
  
Trong phạm vi đồ án, hệ thống tập trung vào một người dùng duy nhất (Single User), không hỗ trợ cộng tác nhiều người trên cùng một dự án. Điều này giúp hệ thống đơn giản hơn nhưng vẫn đáp ứng tốt nhu cầu quản lý cá nhân.
### 1.1.3 Phân tích nhu cầu người dùng
Qua quá trình khảo sát các ứng dụng quản lý công việc hiện có và nhu cầu thực tế của người dùng, hệ thống cần đáp ứng các yêu cầu sau:

- Cho phép người dùng tạo tài khoản và đăng nhập an toàn.
- Tạo mới, chỉnh sửa và xóa các dự án cá nhân.
- Thêm nhiều công việc trong từng dự án.
- Thiết lập ngày bắt đầu và hạn hoàn thành của công việc.
- Gán mức độ ưu tiên cho từng công việc.
- Theo dõi trạng thái thực hiện của công việc.
- Đánh dấu công việc đã hoàn thành.
- Tìm kiếm và lọc công việc theo nhiều tiêu chí.
- Hiển thị thống kê số lượng dự án và công việc.
- Theo dõi tỷ lệ hoàn thành của từng dự án.
- Nhắc nhở các công việc sắp đến hạn.
- Bảo mật thông tin người dùng. <br>

Các chức năng được khảo sát dựa trên các ý kiến đóng góp của các bạn sinh viên và riêng cá nhân tôi người thực hiện đồ án. Với các chức năng trên sẽ đáp ứng được các nhu cầu thực tế của người dùng, hỗ trợ tốt việc quản lý các dự án cá nhân, hạn chế việc bỏ sót hay hoàn thành trể hạn, đáp ứng nhanh các nhu cầu thực tiễn.
### 1.1.4 Các chức năng chính
Qua quá trình khảo sát, hệ thống xây dựng được các chức năng sau
#### a) Quản lý tài khoản
Người dùng có thể đăng ký tài khoản mới, đăng nhập và đăng xuất khỏi hệ thống. Sau khi xác thực thành công bằng JWT, người dùng chỉ có thể truy cập và quản lý dữ liệu của chính mình.
#### b) Quản lý dự án 
Hệ thống cho phép tạo mới dự án, cập nhật thông tin, xóa dự án và xem danh sách tất cả các dự án. Mỗi dự án bao gồm các thông tin như tên dự án, mô tả, ngày tạo, trạng thái và thời gian hoàn thành dự kiến.
#### c) Quản lý công việc
Trong mỗi dự án, người dùng có thể tạo nhiều công việc khác nhau. Đối với mỗi công việc, hệ thống lưu các thông tin:

- Tên công việc.
- Mô tả.
- Ngày bắt đầu.
- Hạn hoàn thành.
- Mức độ ưu tiên (Thấp, Trung bình, Cao).
- Trạng thái (Chưa thực hiện, Đang thực hiện, Hoàn thành).
- Ngày cập nhật. <br>

Người dùng có thể chỉnh sửa, xóa hoặc đánh dấu hoàn thành công việc bất kỳ lúc nào.
#### d) Quản lý tiến độ
Hệ thống tự động tính toán tỷ lệ hoàn thành dựa trên số lượng công việc đã hoàn thành so với tổng số công việc của từng dự án. Kết quả được hiển thị dưới dạng phần trăm giúp người dùng dễ dàng theo dõi tiến độ.
#### e) Tìm kiếm và lọc
Người dùng có thể tìm kiếm theo tên dự án hoặc tên công việc. Ngoài ra, hệ thống hỗ trợ lọc theo:

- Trạng thái.
- Mức độ ưu tiên.
- Ngày đến hạn.
- Dự án. <br>

Các chức năng trên giúp cho việc tìm kiếm trở nên nhanh chóng và thuận tiện.
#### f) Thống kê và báo cáo
Hệ thống cung cấp các thống kê cơ bản như:

- Tổng số dự án.
- Tổng số công việc.
- Số công việc đã hoàn thành.
- Số công việc đang thực hiện.
- Số công việc quá hạn.
- Tỷ lệ hoàn thành của từng dự án.

Các thống kê được trình bày bằng biểu đồ và số liệu tổng hợp nhằm giúp người dùng đánh giá hiệu quả công việc.
#### g) Nhắc nhở công việc
Hệ thống kiểm tra các công việc sắp đến hạn hoặc quá hạn và hiển thị thông báo trên giao diện Dashboard hoặc gửi Email để người dùng chủ động hoàn thành đúng kế hoạch.
### 1.1.5 Các yêu cầu phi chức năng
Ngoài các chức năng chính của hệ thống, dự án còn có các yêu cầu phi chức năng quan trọng để mang lại trải nghiệm tốt cho người sử dụng
#### a) Hiệu năng sử dụng
- Thời gian phản hồi trung bình dưới 3 giây.
- Hỗ trợ đồng thời nhiều yêu cầu API.
- Truy xuất dữ liệu nhanh với MongoDB.
#### b) Bảo mật
- Mật khẩu được mã hóa bằng BCrypt.
- Xác thực người dùng bằng JWT.
- Chỉ chủ sở hữu mới được truy cập dữ liệu của mình.
- Kiểm tra dữ liệu đầu vào để hạn chế các cuộc tấn công phổ biến.
#### c) Khả năng mở rộng
- Mật khẩu được mã hóa bằng BCrypt.
- Xác thực người dùng bằng JWT.
- Chỉ chủ sở hữu mới được truy cập dữ liệu của mình.
- Kiểm tra dữ liệu đầu vào để hạn chế các cuộc tấn công phổ biến.
#### d) Khả năng sử dụng
Giao diện được thiết kế trực quan, dễ sử dụng, bố cục rõ ràng, hỗ trợ người dùng mới làm quen nhanh chóng mà không cần nhiều hướng dẫn.
#### e) Khả năng bảo trì
Backend được tổ chức theo mô hình phân tầng gồm Routes, Controllers, Services và Models, giúp mã nguồn dễ đọc, dễ kiểm thử và thuận tiện trong việc nâng cấp sau này.
### 1.1.6 Tổng kết
Qua quá trình khảo sát và phân tích, có thể xác định hệ thống cần đáp ứng đầy đủ các chức năng quản lý dự án, quản lý công việc, theo dõi tiến độ, thống kê và bảo mật thông tin người dùng. Kiến trúc RESTful API kết hợp MongoDB, JWT, Swagger và Docker đáp ứng tốt các yêu cầu kỹ thuật của đề tài, đồng thời tạo nền tảng thuận lợi cho việc mở rộng hệ thống trong tương lai. Kết quả phân tích yêu cầu là cơ sở để xây dựng mô hình nghiệp vụ, thiết kế cơ sở dữ liệu và triển khai các chức năng của hệ thống ở các phần tiếp theo.

"Các chức năng trên sẽ được thay đổi hoặc bổ sung đầy đủ thêm để hệ thống được hoàn chỉnh hơn trong tương lai"
## 1.2 Yêu cầu phát triển hệ thống
### 1.2.1 Mục tiêu phát triển hệ thống
Hệ thống được xây dựng nhằm hỗ trợ người dùng quản lý các dự án và công việc cá nhân trên nền tảng Web. Trong quá trình phát triển, hệ thống cần đáp ứng các tiêu chí sau:

- Giao diện trực quan, dễ sử dụng đối với người dùng mới.
- Thời gian phản hồi nhanh, thao tác đơn giản.
- Hoạt động ổn định trên các trình duyệt phổ biến.
- Dễ dàng bảo trì và mở rộng trong tương lai.
- Phù hợp với cấu hình máy tính của nhóm phát triển.

Để đáp ứng các tiêu chí trên, hệ thống được xây dựng theo mô hình Frontend – Backend tách biệt, giao tiếp thông qua RESTful API.
### 1.2.2 Các phần mềm phát triển ứng dụng
<table>
  <tr>
    <td> <strong> Thành phần </strong> </td>
    <td> <strong> Công nghệ sử dụng </strong> </td>
    <td> <strong> Mục đích </strong> </td>
  </tr>
  <tr>
    <td> Frontend </td>
    <td> ReactJS </td>
    <td> Xây dựng giao diện người dùng </td>
  </tr>
  <tr>
    <td> Backend </td>
    <td> Node.js + ExpressJS </td>
    <td> Xây dựng RESTful API </td>
  </tr>
  <tr>
    <td> Cơ sở dữ liệu </td>
    <td> MongoDB </td>
    <td> Lưu trữ dữ liệu </td>
  </tr>
  <tr>
    <td> ORM/ODM </td>
    <td> Mongoose </td>
    <td> Kết nối MongoDB </td>
  </tr>
  <tr>
    <td> Xác thực </td>
    <td> JWT </td>
    <td> Bảo mật người dùng </td>
  </tr>
  <tr>
    <td> Mã hóa mật khẩu </td>
    <td> BCrypt </td>
    <td> Bảo vệ thông tin đăng nhập </td>
  </tr>
  <tr>
    <td> Kiểm thử API </td>
    <td> Postman </td>
    <td> Kiểm thử các API </td>
  </tr>
  <tr>
    <td> Tài liệu API </td>
    <td> Swagger </td>
    <td> Mô tả và kiểm thử API </td>
  </tr>
  <tr>
    <td> Quản lý mã nguồn </td>
    <td> GitHub </td>
    <td> Quản lý phiên bản </td>
  </tr>
  <tr>
    <td> Đóng gói ứng dụng </td>
    <td> Docker </td>
    <td> Triển khai hệ thống </td>
  </tr>
</table>

### 1.2.3 Nguyên tắc thiết kế
Để hệ thống hoạt động ổn định và dễ sử dụng, quá trình thiết kế tuân thủ các nguyên tắc sau:

- Giao diện đơn giản, hạn chế thao tác dư thừa.
- Mỗi chức năng chỉ thực hiện một nhiệm vụ cụ thể.
- Các màn hình được bố trí thống nhất về màu sắc và vị trí các nút chức năng.
- Thông tin được cập nhật theo thời gian thực sau khi người dùng thao tác.
- Dữ liệu được kiểm tra trước khi lưu vào cơ sở dữ liệu.
- Phân tách rõ ràng giữa giao diện, xử lý nghiệp vụ và cơ sở dữ liệu.

### 1.2.4 Kiến trúc hệ thống
Hệ thống sử dụng kiến trúc ba tầng (Three-tier Architecture).

#### a) Tầng giao diện (Presentation Layer):

- Xây dựng bằng ReactJS.
- Hiển thị dữ liệu và tiếp nhận thao tác từ người dùng.
- Gửi yêu cầu đến Backend thông qua RESTful API.

#### b) Tầng xử lý nghiệp vụ (Business Layer):

- Xây dựng bằng Node.js và ExpressJS.
- Xử lý nghiệp vụ của hệ thống.
- Xác thực JWT.
- Kiểm tra dữ liệu đầu vào.
- Điều phối việc truy cập cơ sở dữ liệu.

#### c) Tầng dữ liệu (Data Layer):

- Sử dụng MongoDB để lưu trữ dữ liệu.
- Mongoose đảm nhiệm việc ánh xạ dữ liệu giữa ứng dụng và cơ sở dữ liệu.

Kiến trúc này giúp hệ thống dễ bảo trì, mở rộng và triển khai.
### 1.2.5 Kiến trúc backend
Frontend và Backend được xây dựng theo mô hình phân tầng nhằm tăng tính bảo trì và tái sử dụng mã nguồn.
Dưới đây là mô hình kiến trúc của hệ thống

Project-Management-System/
│
├── frontend/                                 
│
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── index.html
│   │
│   ├── src/
│   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │   └── styles/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── forms/
│   │   │   ├── charts/
│   │   │   ├── tables/
│   │   │   └── notifications/
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   │
│   │   │   ├── project/
│   │   │   │   ├── ProjectList.jsx
│   │   │   │   ├── CreateProject.jsx
│   │   │   │   ├── UpdateProject.jsx
│   │   │   │   └── ProjectDetail.jsx
│   │   │   │
│   │   │   ├── task/
│   │   │   │   ├── TaskList.jsx
│   │   │   │   ├── CreateTask.jsx
│   │   │   │   ├── UpdateTask.jsx
│   │   │   │   ├── TaskDetail.jsx
│   │   │   │   └── Calendar.jsx
│   │   │   │
│   │   │   ├── notification/
│   │   │   │   └── Notification.jsx
│   │   │   │
│   │   │   ├── statistics/
│   │   │   │   └── Statistics.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   └── settings/
│   │   │       └── Settings.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── project.service.js
│   │   │   ├── task.service.js
│   │   │   ├── notification.service.js
│   │   │   └── statistics.service.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useProject.js
│   │   │   ├── useTask.js
│   │   │   └── useNotification.js
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── formatter.js
│   │   │   ├── validator.js
│   │   │   ├── storage.js
│   │   │   └── helper.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   └── README.md
│
├── backend/
│
│   ├── src/
│   │
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── env.js
│   │   │   ├── swagger.js
│   │   │   ├── mail.js
│   │   │   ├── cors.js
│   │   │   └── upload.js
│   │   │
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── project.routes.js
│   │   │   ├── task.routes.js
│   │   │   ├── comment.routes.js
│   │   │   ├── notification.routes.js
│   │   │   ├── statistics.routes.js
│   │   │   ├── calendar.routes.js
│   │   │   └── upload.routes.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── AuthController.js
│   │   │   ├── UserController.js
│   │   │   ├── ProjectController.js
│   │   │   ├── TaskController.js
│   │   │   ├── CommentController.js
│   │   │   ├── NotificationController.js
│   │   │   ├── StatisticsController.js
│   │   │   ├── CalendarController.js
│   │   │   └── UploadController.js
│   │   │
│   │   ├── services/
│   │   │   ├── AuthService.js
│   │   │   ├── UserService.js
│   │   │   ├── ProjectService.js
│   │   │   ├── TaskService.js
│   │   │   ├── CommentService.js
│   │   │   ├── NotificationService.js
│   │   │   ├── StatisticsService.js
│   │   │   ├── CalendarService.js
│   │   │   ├── EmailService.js
│   │   │   └── UploadService.js
│   │   │
│   │   ├── repositories/
│   │   │   ├── UserRepository.js
│   │   │   ├── ProjectRepository.js
│   │   │   ├── TaskRepository.js
│   │   │   ├── CommentRepository.js
│   │   │   ├── NotificationRepository.js
│   │   │   └── StatisticsRepository.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   ├── Task.js
│   │   │   ├── Comment.js
│   │   │   ├── Notification.js
│   │   │   ├── ActivityLog.js
│   │   │   └── RefreshToken.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   ├── uploadMiddleware.js
│   │   │   ├── loggerMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── corsMiddleware.js
│   │   │
│   │   ├── validations/
│   │   │   ├── auth.validation.js
│   │   │   ├── user.validation.js
│   │   │   ├── project.validation.js
│   │   │   ├── task.validation.js
│   │   │   ├── comment.validation.js
│   │   │   └── notification.validation.js
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   ├── bcrypt.js
│   │   │   ├── email.js
│   │   │   ├── cron.js
│   │   │   ├── response.js
│   │   │   ├── pagination.js
│   │   │   ├── formatter.js
│   │   │   ├── constants.js
│   │   │   └── helper.js
│   │   │
│   │   ├── jobs/
│   │   │   ├── reminder.job.js
│   │   │   ├── notification.job.js
│   │   │   ├── overdue.job.js
│   │   │   └── backup.job.js
│   │   │
│   │   ├── docs/
│   │   │   ├── swagger.yaml
│   │   │   ├── openapi.json
│   │   │   └── postman_collection.json
│   │   │
│   │   ├── uploads/
│   │   │   ├── avatars/
│   │   │   ├── attachments/
│   │   │   └── temp/
│   │   │
│   │   ├── logs/
│   │   │   ├── access.log
│   │   │   └── error.log
│   │   │
│   │   ├── tests/
│   │   │   ├── auth.test.js
│   │   │   ├── project.test.js
│   │   │   ├── task.test.js
│   │   │   └── notification.test.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   └── README.md
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE

<strong> Hình ảnh minh họa mô hình kiến trúc Backend của hệ thống </strong> <br>

<img width="1024" height="559" alt="Mo_hinh_kien_truc_Frontend_Backend" src="https://github.com/user-attachments/assets/10412e0b-ab23-4c53-8f6f-a939924d97b8" />

<em> <strong> Hình ảnh được tạo bằng công cụ AI GEMINI </strong> </em>

Bên trong thư mục assets có thêm phần kiến trúc như sau:

src/
│
├── assets/
│
│   ├── images/
│   │   ├── logo.png
│   │   ├── logo-white.png
│   │   ├── avatar-default.png
│   │   ├── login-banner.png
│   │   ├── register-banner.png
│   │   ├── empty-data.png
│   │   ├── not-found.png
│   │   ├── loading.gif
│   │   └── background.jpg
│   │
│   ├── icons/
│   │   ├── dashboard.svg
│   │   ├── project.svg
│   │   ├── task.svg
│   │   ├── calendar.svg
│   │   ├── notification.svg
│   │   ├── statistics.svg
│   │   ├── profile.svg
│   │   ├── settings.svg
│   │   ├── logout.svg
│   │   └── upload.svg
│   │
│   ├── fonts/
│   │   ├── Roboto-Regular.ttf
│   │   ├── Roboto-Medium.ttf
│   │   ├── Roboto-Bold.ttf
│   │   └── OFL.txt
│   │
│   └── styles/
│       ├── index.css
│       ├── variables.css
│       ├── reset.css
│       ├── global.css
│       ├── layout.css
│       ├── sidebar.css
│       ├── navbar.css
│       ├── button.css
│       ├── form.css
│       ├── table.css
│       ├── modal.css
│       ├── card.css
│       ├── dashboard.css
│       ├── project.css
│       ├── task.css
│       ├── calendar.css
│       ├── notification.css
│       ├── statistics.css
│       ├── profile.css
│       ├── auth.css
│       ├── responsive.css
│       └── animation.css
 
### 1.2.6 Định hướng phát triển giao diện
Để phù hợp với người dùng cá nhân, giao diện được thiết kế theo phong cách tối giản với các màn hình chính:

- Trang đăng nhập.
- Trang đăng ký.
- Dashboard tổng quan.
- Danh sách dự án.
- Chi tiết dự án.
- Danh sách công việc.
- Thêm và chỉnh sửa công việc.
- Thống kê tiến độ.
- Hồ sơ cá nhân.
- Cài đặt.

Hệ thống hỗ trợ giao diện Responsive để sử dụng thuận tiện trên máy tính và máy tính bảng.

### 1.2.7 Chức năng nhắc việc
Để tăng tính tiện lợi, hệ thống hỗ trợ hai hình thức thông báo:

- Thông báo trực tiếp trên Dashboard khi người dùng đăng nhập.
- Gửi email nhắc việc đối với các công việc sắp đến hạn hoặc đã quá hạn.

Việc gửi email được thực hiện thông qua Gmail SMTP kết hợp thư viện Nodemailer và bộ lập lịch node-cron. Đây là chức năng mở rộng, không ảnh hưởng đến các chức năng chính của hệ thống.

### 1.2.8 Công nghệ sử dụng
1. Frontend
   
- ReactJS: Xây dựng giao diện người dùng theo mô hình component.
- Vite: Công cụ khởi tạo và chạy môi trường phát triển React.
- React Router DOM: Quản lý điều hướng giữa các trang như Đăng nhập, Dashboard, Dự án và Công việc.
- Axios: Gửi các yêu cầu HTTP từ frontend đến RESTful API.
- Bootstrap: Hỗ trợ thiết kế giao diện responsive.

3. Backend

- Node.js: Môi trường thực thi JavaScript phía máy chủ.
- Express.js: Xây dựng RESTful API.
- Mongoose: Kết nối và thao tác với cơ sở dữ liệu MongoDB.
- JWT (JSON Web Token): Xác thực người dùng.
- BCrypt: Mã hóa mật khẩu người dùng.
- Express Validator: Kiểm tra và xác thực dữ liệu đầu vào.
- Nodemon: Tự động khởi động lại server trong quá trình phát triển.

5. Cơ sở dữ liệu
   
- MongoDB: Cơ sở dữ liệu NoSQL sử dụng để lưu trữ thông tin người dùng, dự án và công việc.
- MongoDB Compass: Công cụ hỗ trợ trực quan trong quá trình kiểm tra và quản lý dữ liệu MongoDB.

7. API và kiểm thử

- RESTful API: Kết nối giữa frontend và backend.
- Swagger/OpenAPI: Tài liệu hóa và kiểm tra các API của hệ thống.
- Jest: Kiểm thử các chức năng backend.

9. Triển khai và quản lý mã nguồn
   
- Docker: Đóng gói và triển khai ứng dụng.
- Docker Compose: Hỗ trợ quản lý nhiều dịch vụ của hệ thống.
- Git: Quản lý phiên bản mã nguồn.
- GitHub: Lưu trữ mã nguồn và quản lý lịch sử thay đổi.

11. Công cụ phát triển

Visual Studio Code: Môi trường lập trình chính.
GitHub CLI: Hỗ trợ thao tác với GitHub thông qua dòng lệnh.
