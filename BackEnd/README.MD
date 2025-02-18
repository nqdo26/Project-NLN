# Dự án Quản lý Học tập Cá nhân - Backend

Đây là phần backend của dự án Quản lý Học tập Cá nhân, cung cấp các API cho ứng dụng frontend và xử lý các logic nghiệp vụ liên quan đến việc quản lý khóa học, bài học, dự án, bài kiểm tra và thống kê tiến độ học tập của người dùng.

## Tính năng

-   Xác thực người dùng: Đăng ký, đăng nhập và bảo mật các API bằng JWT.
-   Quản lý người dùng: Cung cấp thông tin tài khoản, cập nhật thông tin cá nhân, quản lý ảnh đại diện.
-   Quản lý ghi chú cá nhân: Cho phép người dùng tạo và cập nhật ghi chú phục vụ cho việc học tập.
-   Quản lý thẻ (Tags): Tạo, lấy thông tin, cập nhật và xóa các thẻ phục vụ cho việc phân loại.
-   Quản lý kỳ học (Terms): Tạo, lấy thông tin, cập nhật và xóa các kỳ học.
-   Quản lý khóa học và bài học: Tạo, lấy thông tin, cập nhật và xóa khóa học, bài học.
-   Quản lý dự án: Tạo dự án, quản lý các bước trong dự án và cập nhật tiến độ.
-   Quản lý bài kiểm tra: Tạo bài kiểm tra, cập nhật điểm số và lấy thông tin bài kiểm tra.
-   Thống kê học tập: Cung cấp API để lấy các số liệu thống kê về quá trình học tập của người dùng.

## Công nghệ sử dụng

**Frontend:** ReactJS, Ant Design, Chart.js, Axios, Classnames.

**Backend:** Node.js, Express.js, MongoDB (mongoose), Multer, bcrypt, dotenv.

**Authentication:** JSON Web Token (JWT).

**Styling:** SASS (SCSS Modules), CSS.

## Links

[Frontend](https://github.com/lethinhhung/NienLuanCoSo-FrontEnd)

[Backend](https://github.com/lethinhhung/NienLuanCoSo-BackEnd)

## Cài đặt

Yêu cầu hệ thống

-   Node.js (>=12.x)
-   npm hoặc yarn
-   MongoDB

Clone repository

```bash
git clone project-link
cd project-name
```

Cài đặt các package

```bash
npm install
```

Cấu hình biến môi trường - tạo file .env ở thư mục gốc với nội dung

```bash
NODE_ENV=development //chế dộ
PORT=8080 //cổng localhost

MONGO_DB_URL=mongodb+srv://your_cluster //url kết nối MongoDB

JWT_SECRET=your_password //chuỗi jwt key của bạn
JWT_EXPIRE=1d //thời gian hết hạn - ở đây là 1 ngày
```

## Triển khai ứng dụng

```bash
  npm start
```

Chế độ phát triển

```bash
  npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ http://localhost:8080

## Sử dụng

-   API Endpoint: Tất cả các endpoint API đều bắt đầu với tiền tố /v1/api/.
-   Xác thực: Sử dụng JWT cho các API cần xác thực. Token cần được gửi trong header Authorization dưới dạng Bearer <token>.

## APIs

[Frontend](https://github.com/lethinhhung/NienLuanCoSo-FrontEnd/blob/main/api%20-%20frontend.txt)

[Backend](https://github.com/lethinhhung/NienLuanCoSo-BackEnd/blob/main/api%20-%20backend.txt)

## Authors

[@thinghunggg](https://github.com/lethinhhung)
