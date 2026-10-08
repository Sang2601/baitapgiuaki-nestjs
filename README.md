# BÁO CÁO BÀI TẬP GIỮA KỲ: HỆ THỐNG QUẢN LÝ THƯ VIỆN & XÁC THỰC PHÂN QUYỀN NESTJS

## 📌 YÊU CẦU SỐ 4: AUTHENTICATION & AUTHORISATION TRONG NESTJS (JWT & ROLES)

### 1. Giới thiệu tổng quan
Hệ thống được phát triển trên nền tảng **NestJS** kết hợp **TypeORM** (CSDL SQLite local `library.db`), triển khai đầy đủ cơ chế bảo mật:
- **Authentication (Xác thực danh tính):** Sử dụng `@nestjs/jwt` để cấp phát JSON Web Token (JWT) và mã hóa mật khẩu người dùng với `bcryptjs` (salt rounds = 10).
- **Authorisation (Phân quyền truy cập):** Sử dụng `RolesGuard` cùng Decorator tùy chỉnh `@Roles()` để kiểm tra vai trò người dùng (`admin` vs `user`), ngăn chặn truy cập trái phép bằng mã phản hồi `403 Forbidden`.

---

### 2. Các thành phần đã triển khai trong mã nguồn (`src/auth`)

| Thành phần | Đường dẫn | Mô tả chi tiết |
| :--- | :--- | :--- |
| **User Entity** | `src/auth/entities/user.entity.ts` | Thực thể lưu trữ người dùng trong bảng `users` (id, username, password đã băm, name, role `admin`/`user`, createdAt). |
| **DTOs** | `src/auth/dto/register.dto.ts`, `login.dto.ts` | Kiểm tra tính hợp lệ dữ liệu đầu vào với `class-validator` (độ dài mật khẩu, kiểu dữ liệu, vai trò hợp lệ). |
| **AuthService** | `src/auth/auth.service.ts` | Xử lý logic nghiệp vụ: Đăng ký (băm mật khẩu bằng `bcryptjs.hash`), Đăng nhập (kiểm tra mật khẩu `bcryptjs.compare`, ký và tạo access_token qua `jwtService.signAsync`), Tự động khởi tạo 2 tài khoản mẫu `admin` và `user1`. |
| **AuthGuard** | `src/auth/guards/auth.guard.ts` | Trích xuất và xác thực `Bearer <token>` từ header `Authorization`, giải mã thông tin user vào `request.user`. Ném lỗi `401 Unauthorized` nếu không có hoặc sai token. |
| **RolesGuard** | `src/auth/guards/roles.guard.ts` | Sử dụng `Reflector` để đọc metadata `@Roles()`, đối chiếu với vai trò của user trong token. Ném lỗi `403 Forbidden` nếu không đủ quyền. |
| **Decorators** | `src/auth/decorators/roles.decorator.ts`, `current-user.decorator.ts` | `@Roles()` khai báo quyền hạn cho endpoint, `@CurrentUser()` trích xuất user hiện tại thuận tiện. |
| **AuthController** | `src/auth/auth.controller.ts` | Cung cấp các API: Register, Login, Profile (yêu cầu Auth), Admin-only (yêu cầu Role Admin), Users (danh sách CSDL). |
| **AuthModule** | `src/auth/auth.module.ts` | Đăng ký `JwtModule.register({ secret: '...', signOptions: { expiresIn: '1d' } })` và cung cấp các Guard, Service. |

---

### 3. Danh sách các API Authentication & Authorisation

| Phương thức | Endpoint | Yêu cầu xác thực | Vai trò yêu cầu | Chức năng |
| :---: | :--- | :---: | :---: | :--- |
| `POST` | `/auth/register` | ❌ Không | Bất kỳ | Đăng ký tài khoản mới (mật khẩu tự động băm) |
| `POST` | `/auth/login` | ❌ Không | Bất kỳ | Đăng nhập hệ thống, nhận chuỗi `access_token` JWT |
| `GET` | `/auth/profile` | ✅ Có (Bearer Token) | Bất kỳ user đã đăng nhập | Lấy thông tin cá nhân từ JWT Payload (`200 OK` hoặc `401 Unauthorized`) |
| `GET` | `/auth/admin-only` | ✅ Có (Bearer Token) | `admin` | Endpoint đặc quyền dành riêng cho Quản trị viên (`200 OK` với Admin, `403 Forbidden` với User) |
| `GET` | `/auth/users` | ❌ Không | Bất kỳ | Liệt kê danh sách tài khoản trong CSDL SQLite |

---

### 4. Tài khoản mẫu để kiểm thử nhanh
Hệ thống tự động khởi tạo sẵn trong CSDL:
- **Tài khoản Quản trị viên (Admin):**
  - Username: `admin`
  - Password: `admin123`
  - Role: `admin`
- **Tài khoản Độc giả / Người dùng thường (User):**
  - Username: `user1`
  - Password: `123456`
  - Role: `user`

---

### 5. Hướng dẫn chạy và kiểm thử

#### Cài đặt thư viện:
```bash
npm install
```

#### Biên dịch mã nguồn:
```bash
npm run build
```

#### Chạy máy chủ:
```bash
npm run start
# hoặc chế độ dev:
npm run start:dev
```
Truy cập giao diện trực quan và Console kiểm thử tại: **`http://localhost:3000`**

---

### 6. Minh chứng nộp bài (Ảnh chụp màn hình)

#### 6.1. Ảnh chụp màn hình kiểm thử API thành công (Postman / JWT Console):
File đính kèm: `screenshot_api_success.jpg`
- Kiểm thử `POST /auth/login` thành công trả về `access_token` JWT (Status: 200 OK).
- Kiểm thử `GET /auth/profile` với `Authorization: Bearer <token>` thành công (Status: 200 OK).
- Kiểm thử `GET /auth/admin-only` xác thực vai trò Admin thành công (Status: 200 OK) và chặn User thông thường (Status: 403 Forbidden).

#### 6.2. Ảnh chụp màn hình dữ liệu trong CSDL SQLite:
File đính kèm: `screenshot_csdl_database.jpg`
- Bảng `users` trong cơ sở dữ liệu `library.db` thể hiện đầy đủ các trường: `id`, `username`, `password` (chuỗi hash bcrypt bắt đầu bằng `$2b$10$...`), `name`, `role`, `createdAt`.

---

### 7. Kịch bản thuyết trình của Nhóm sinh viên (Trình bày từ 8:20)

- **Phần 1: Đặt vấn đề và mục tiêu (1-2 phút):**
  - Giới thiệu yêu cầu số 4: Xây dựng cơ chế bảo mật Authentication (Ai đang truy cập?) và Authorisation (Người đó có quyền làm gì?) trong NestJS.
  - Sử dụng chuẩn công nghiệp JWT (JSON Web Token) kết hợp thuật toán mã hóa mật khẩu một chiều Bcrypt.
- **Phần 2: Kiến trúc và tổ chức mã nguồn (2-3 phút):**
  - Trình bày kiến trúc `AuthModule`: kết hợp `TypeOrmModule` quản lý thực thể `User`, `JwtModule` quản lý việc phát hành và giải mã token.
  - Giải thích `AuthService`: phương thức `register` băm mật khẩu, phương thức `login` xác thực credentials và tạo chuỗi JWT.
  - Giải thích `AuthGuard`: trích xuất `Bearer <token>` từ Request Header và verify bằng `jwtService.verifyAsync`.
  - Giải thích `RolesGuard`: kết hợp `@Roles(UserRole.ADMIN)` để kiểm tra quyền và trả về `403 Forbidden` khi tài khoản không đủ quyền.
- **Phần 3: Trình diễn trực tiếp (Demo Live) (3-4 phút):**
  - Mở giao diện `http://localhost:3000` hoặc công cụ Postman:
    1. Đăng nhập với tài khoản `user1` -> nhận JWT token -> gọi `GET /auth/profile` thành công (Status 200).
    2. Dùng token của `user1` gọi `GET /auth/admin-only` -> hệ thống lập tức chặn với mã `403 Forbidden` vì role là `user`.
    3. Đăng nhập với tài khoản `admin` -> dùng token mới gọi `GET /auth/admin-only` -> thành công với mã `200 OK`.
    4. Thử gọi API khi chưa truyền token -> nhận mã `401 Unauthorized`.
  - Mở bảng dữ liệu CSDL SQLite `library.db` chứng minh mật khẩu được mã hóa an toàn và các bản ghi được lưu trữ chuẩn xác.
- **Phần 4: Kết luận và giải đáp câu hỏi của Giảng viên (1 phút).**
