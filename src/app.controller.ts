import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  getUi(): string {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hệ thống Quản lý Thư viện - NestJS (JWT Auth & Library)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg: #0b0f19;
      --card-bg: #151d30;
      --border: #22304d;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --success: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
      --accent: #38bdf8;
      --purple: #a855f7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 24px 16px;
    }
    .container { max-width: 1240px; margin: 0 auto; }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .title-group h1 { font-size: 26px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px; }
    .title-group p { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid var(--success);
      color: #34d399;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      margin: 28px 0 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding-left: 8px;
      border-left: 4px solid var(--primary);
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--accent);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pill {
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 6px;
      background: rgba(79, 70, 229, 0.2);
      color: #a5b4fc;
      border: 1px solid rgba(79, 70, 229, 0.4);
      font-weight: 500;
    }
    .form-group { margin-bottom: 14px; }
    label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #cbd5e1; }
    select, input {
      width: 100%;
      padding: 10px 14px;
      border-radius: 8px;
      background: #0b0f19;
      border: 1px solid var(--border);
      color: #fff;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    select:focus, input:focus { border-color: var(--primary); }
    button {
      cursor: pointer;
      padding: 10px 18px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      width: 100%;
      transition: all 0.2s;
    }
    button:hover { background: var(--primary-hover); }
    button:active { transform: scale(0.98); }
    .btn-secondary {
      background: #1e293b;
      width: auto;
      padding: 8px 14px;
      font-size: 13px;
      border: 1px solid var(--border);
    }
    .btn-secondary:hover { background: #334155; }
    .btn-quick {
      background: #1e293b;
      border: 1px solid var(--border);
      color: #cbd5e1;
      padding: 6px 12px;
      font-size: 12px;
      border-radius: 6px;
      width: auto;
    }
    .btn-quick:hover { background: #334155; color: #fff; border-color: var(--accent); }
    .btn-test {
      padding: 9px 14px;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .alert {
      margin-top: 14px;
      padding: 12px;
      border-radius: 8px;
      font-size: 13px;
      display: none;
      word-break: break-all;
    }
    .alert-success { background: rgba(16, 185, 129, 0.15); border: 1px solid var(--success); color: #34d399; }
    .alert-error { background: rgba(239, 68, 68, 0.15); border: 1px solid var(--danger); color: #f87171; }
    .alert-info { background: rgba(56, 189, 248, 0.15); border: 1px solid var(--accent); color: #38bdf8; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    th, td {
      padding: 11px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    th {
      background: #0b0f19;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    tr:hover td { background: rgba(255, 255, 255, 0.02); }
    .tag {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent);
    }
    .tag-admin { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
    .tag-user { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .table-responsive { overflow-x: auto; }
    .empty-state { text-align: center; padding: 28px 12px; color: var(--text-muted); font-size: 13px; }
    .code-box {
      background: #070a12;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      color: #cbd5e1;
      max-height: 180px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .session-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 14px;
    }
    .tabs { display: flex; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border-radius: 6px;
      width: auto;
    }
    .tab-btn.active { background: var(--primary); color: #fff; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="title-group">
        <h1>🛡️ NestJS Auth & Library System</h1>
        <p>Báo cáo Bài tập Giữa kỳ - Yêu cầu 4: Authentication / Authorisation (JWT & Roles)</p>
      </div>
      <div class="badge-status">
        ● SQLite CSDL: library.db (Sẵn sàng)
      </div>
    </header>

    <!-- PHẦN 1: AUTHENTICATION & AUTHORISATION -->
    <div class="section-title">
      🔐 YÊU CẦU SỐ 4: AUTHENTICATION & AUTHORISATION (JWT + ROLES GUARD)
    </div>

    <div class="grid">
      <!-- CỘT 1: ĐĂNG NHẬP / ĐĂNG KÝ -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">🔑 Đăng Nhập & Đăng Ký Tài Khoản</div>
          <span class="pill">@nestjs/jwt + bcryptjs</span>
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button type="button" class="btn-secondary" id="authTabLogin" style="flex:1; background: var(--primary);">Đăng Nhập</button>
          <button type="button" class="btn-secondary" id="authTabRegister" style="flex:1;">Đăng Ký Mới</button>
        </div>

        <!-- Form Đăng nhập -->
        <div id="loginSection">
          <div style="margin-bottom: 14px;">
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">⚡ Đăng nhập nhanh tài khoản mẫu:</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" class="btn-quick" onclick="quickFillLogin('admin', 'admin123')">👑 Admin (admin/admin123)</button>
              <button type="button" class="btn-quick" onclick="quickFillLogin('user1', '123456')">👤 User (user1/123456)</button>
            </div>
          </div>
          <form id="formLogin">
            <div class="form-group">
              <label>Tài khoản (Username):</label>
              <input type="text" id="loginUsername" placeholder="Nhập username..." required />
            </div>
            <div class="form-group">
              <label>Mật khẩu (Password):</label>
              <input type="password" id="loginPassword" placeholder="Nhập password..." required />
            </div>
            <button type="submit" id="btnLogin">Đăng Nhập & Tạo JWT Token</button>
          </form>
        </div>

        <!-- Form Đăng ký -->
        <div id="registerSection" style="display: none;">
          <form id="formRegister">
            <div class="form-group">
              <label>Họ và tên:</label>
              <input type="text" id="regName" placeholder="Ví dụ: Trần Văn Nam" required />
            </div>
            <div class="form-group">
              <label>Tài khoản (Username):</label>
              <input type="text" id="regUsername" placeholder="Ví dụ: namtv" required />
            </div>
            <div class="form-group">
              <label>Mật khẩu (Tối thiểu 6 ký tự):</label>
              <input type="password" id="regPassword" placeholder="Ví dụ: 123456" required />
            </div>
            <div class="form-group">
              <label>Vai trò (Role):</label>
              <select id="regRole">
                <option value="user">Độc giả thường (user)</option>
                <option value="admin">Quản trị viên (admin)</option>
              </select>
            </div>
            <button type="submit" style="background: var(--purple);">Tạo Tài Khoản Mới</button>
          </form>
        </div>

        <div id="authAlert" class="alert"></div>
      </div>

      <!-- CỘT 2: TRẠNG THÁI PHIÊN LÀM VIỆC & TEST API BẢO VỆ -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">🧪 Kiểm Thử API Bảo Vệ (JWT Console)</div>
          <button class="btn-quick" onclick="logout()" style="color:#f87171;">Đăng xuất / Xóa Token</button>
        </div>

        <!-- Trạng thái phiên hiện tại -->
        <div class="session-badge" id="sessionInfoBox">
          <div style="font-size: 24px;" id="userAvatar">⚪</div>
          <div style="flex:1;">
            <div style="font-weight: 600; font-size: 14px;" id="sessionUserName">Chưa đăng nhập</div>
            <div style="font-size: 12px; color: var(--text-muted);" id="sessionUserMeta">Vui lòng đăng nhập bằng form bên trái để nhận JWT Token</div>
          </div>
          <div id="sessionRoleTag"></div>
        </div>

        <!-- JWT Token String Box -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label style="margin:0;">JWT Token hiện tại (Bearer Token):</label>
            <button class="btn-quick" type="button" onclick="copyToken()" style="padding: 2px 8px; font-size: 11px;">📋 Copy Token</button>
          </div>
          <input type="text" id="tokenDisplay" readonly placeholder="Chưa có JWT Token. Hãy bấm đăng nhập..." style="font-family: monospace; font-size: 12px; color: #38bdf8;" />
        </div>

        <!-- Các nút bấm kiểm tra API -->
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
          <button type="button" class="btn-test" style="background:#2563eb;" onclick="testApi('/auth/profile', true)">
            <span>1️⃣ Test Authentication: <code>GET /auth/profile</code> (Gửi kèm Token)</span>
          </button>
          <button type="button" class="btn-test" style="background:#059669;" onclick="testApi('/auth/admin-only', true)">
            <span>2️⃣ Test Authorisation (Roles): <code>GET /auth/admin-only</code> (Yêu cầu ADMIN)</span>
          </button>
          <button type="button" class="btn-test" style="background:#dc2626;" onclick="testApi('/auth/profile', false)">
            <span>3️⃣ Test API Không Gửi Token (Kiểm tra Chặn 401 Unauthorized)</span>
          </button>
        </div>

        <!-- Màn hình kết quả phản hồi JSON -->
        <div>
          <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">
            Kết Quả Phản Hồi Từ Server: <span id="apiStatusBadge"></span>
          </div>
          <div class="code-box" id="apiResponseBox">// Bấm các nút kiểm thử phía trên để gửi Request tới Backend...</div>
        </div>
      </div>
    </div>

    <!-- PHẦN 2: BẢNG DỮ LIỆU CƠ SỞ DỮ LIỆU (CSDL) -->
    <div class="section-title">
      🗄️ DỮ LIỆU CSDL LOCAL (SQLITE: library.db) - CHỤP MÀN HÌNH MINH CHỨNG
    </div>

    <div class="card" style="margin-bottom: 24px;">
      <div class="tabs">
        <button class="tab-btn active" id="tabUsersBtn" onclick="switchDbTab('users')">👥 Bảng CSDL: USERS (Tài khoản & Phân quyền)</button>
        <button class="tab-btn" id="tabBorrowedBtn" onclick="switchDbTab('borrowed')">📚 Bảng CSDL: SÁCH ĐÃ MƯỢN (Câu 3.4)</button>
      </div>

      <!-- Tab xem Users CSDL -->
      <div id="tabUsersContent">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:13px; color:var(--text-muted);">Danh sách tài khoản được lưu trong bảng <code>users</code> (Mật khẩu băm an toàn với Bcrypt)</span>
          <button class="btn-secondary" onclick="loadUsersTable()">🔄 Cập nhật bảng Users</button>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Họ tên</th>
                <th>Vai trò (Role)</th>
                <th>Mật khẩu băm (Bcrypt Hash Preview)</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody id="usersTableBody">
              <tr><td colspan="6" class="empty-state">Đang tải danh sách người dùng...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab xem Sách đã mượn -->
      <div id="tabBorrowedContent" style="display:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:13px; color:var(--text-muted);">Danh sách sách đã được mượn lưu trong bảng <code>borrowed_records</code></span>
          <button class="btn-secondary" onclick="loadBorrowedBooks()">🔄 Cập nhật phiếu mượn</button>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Người mượn</th>
                <th>Liên hệ</th>
                <th>Ngày mượn</th>
                <th>Hạn trả sách</th>
              </tr>
            </thead>
            <tbody id="borrowedTableBody">
              <tr><td colspan="7" class="empty-state">Đang tải dữ liệu sách đã mượn...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- PHẦN 3: CÁC CHỨC NĂNG THƯ VIỆN (CÂU 1, 2, 3) -->
    <div class="section-title">
      📖 CHỨC NĂNG THƯ VIỆN (QUẢN LÝ SÁCH, ĐỘC GIẢ, MƯỢN TRẢ)
    </div>

    <div class="grid">
      <!-- MƯỢN SÁCH -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">📖 Độc Giả Mượn Sách (Câu 3.3)</div>
        </div>
        <form id="borrowForm">
          <div class="form-group">
            <label for="readerSelect">1. Chọn Độc giả (Reader):</label>
            <select id="readerSelect" required>
              <option value="">-- Đang tải danh sách độc giả... --</option>
            </select>
          </div>
          <div class="form-group">
            <label for="bookSelect">2. Chọn Sách (Book):</label>
            <select id="bookSelect" required>
              <option value="">-- Đang tải danh sách sách... --</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dueDateInput">3. Hạn trả sách (Due Date):</label>
            <input type="date" id="dueDateInput" required />
          </div>
          <button type="submit" id="btnSubmitBorrow">Xác Nhận Mượn Sách</button>
        </form>
        <div id="borrowAlert" class="alert"></div>
      </div>

      <!-- THÊM SÁCH / ĐỘC GIẢ -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">➕ Quản Lý Dữ Liệu (Sách / Độc Giả)</div>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
          <button type="button" class="btn-secondary" id="tabBook" style="flex:1; background: var(--primary);">Thêm Sách mới</button>
          <button type="button" class="btn-secondary" id="tabReader" style="flex:1;">Thêm Độc giả mới</button>
        </div>
        <!-- Form thêm sách -->
        <form id="addBookForm">
          <div class="form-group">
            <label>Tên sách:</label>
            <input type="text" id="newBookTitle" placeholder="Ví dụ: Lập trình NestJS Toàn tập" required />
          </div>
          <div class="form-group">
            <label>Tác giả:</label>
            <input type="text" id="newBookAuthor" placeholder="Ví dụ: Kamil Myśliwiec" required />
          </div>
          <button type="submit">Thêm Sách</button>
        </form>
        <!-- Form thêm độc giả -->
        <form id="addReaderForm" style="display: none;">
          <div class="form-group">
            <label>Họ và tên độc giả:</label>
            <input type="text" id="newReaderName" placeholder="Ví dụ: Hoàng Minh Đức" required />
          </div>
          <div class="form-group">
            <label>Email (tùy chọn):</label>
            <input type="email" id="newReaderEmail" placeholder="duc@gmail.com" />
          </div>
          <div class="form-group">
            <label>Số điện thoại (tùy chọn):</label>
            <input type="text" id="newReaderPhone" placeholder="0987654321" />
          </div>
          <button type="submit">Thêm Độc Giả</button>
        </form>
        <div id="quickAddAlert" class="alert"></div>
      </div>
    </div>
  </div>

  <script>
    // --- BIẾN TRẠNG THÁI JWT ---
    let currentToken = localStorage.getItem('jwt_token') || '';
    let currentUser = null;
    try {
      currentUser = JSON.parse(localStorage.getItem('jwt_user') || 'null');
    } catch(e) { currentUser = null; }

    function updateSessionUi() {
      const tokenDisplay = document.getElementById('tokenDisplay');
      const sessionUserName = document.getElementById('sessionUserName');
      const sessionUserMeta = document.getElementById('sessionUserMeta');
      const sessionRoleTag = document.getElementById('sessionRoleTag');
      const userAvatar = document.getElementById('userAvatar');

      tokenDisplay.value = currentToken || '';
      if (currentToken && currentUser) {
        userAvatar.innerText = currentUser.role === 'admin' ? '👑' : '👤';
        sessionUserName.innerText = currentUser.name + ' (@' + currentUser.username + ')';
        sessionUserMeta.innerText = 'Đăng nhập thành công • User ID: ' + currentUser.id;
        sessionRoleTag.innerHTML = currentUser.role === 'admin' 
          ? '<span class="tag tag-admin">ROLE: ADMIN</span>' 
          : '<span class="tag tag-user">ROLE: USER</span>';
      } else {
        userAvatar.innerText = '⚪';
        sessionUserName.innerText = 'Chưa đăng nhập';
        sessionUserMeta.innerText = 'Vui lòng đăng nhập bằng form bên trái để nhận JWT Token';
        sessionRoleTag.innerHTML = '';
      }
    }

    function quickFillLogin(u, p) {
      document.getElementById('loginUsername').value = u;
      document.getElementById('loginPassword').value = p;
    }

    function logout() {
      currentToken = '';
      currentUser = null;
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('jwt_user');
      updateSessionUi();
      document.getElementById('apiResponseBox').innerText = '// Đã đăng xuất và xóa JWT Token.';
      document.getElementById('apiStatusBadge').innerHTML = '';
    }

    function copyToken() {
      if (!currentToken) { alert('Chưa có token để copy!'); return; }
      navigator.clipboard.writeText(currentToken);
      alert('Đã sao chép JWT Token vào clipboard!');
    }

    // Toggle Tab Login / Register
    const authTabLogin = document.getElementById('authTabLogin');
    const authTabRegister = document.getElementById('authTabRegister');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');

    authTabLogin.addEventListener('click', () => {
      authTabLogin.style.background = 'var(--primary)';
      authTabRegister.style.background = '#1e293b';
      loginSection.style.display = 'block';
      registerSection.style.display = 'none';
      document.getElementById('authAlert').style.display = 'none';
    });

    authTabRegister.addEventListener('click', () => {
      authTabRegister.style.background = 'var(--primary)';
      authTabLogin.style.background = '#1e293b';
      registerSection.style.display = 'block';
      loginSection.style.display = 'none';
      document.getElementById('authAlert').style.display = 'none';
    });

    // Submit Đăng nhập (POST /auth/login)
    document.getElementById('formLogin').addEventListener('submit', async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('authAlert');
      alertBox.style.display = 'none';
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value;

      try {
        const res = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          currentToken = data.access_token;
          currentUser = data.user;
          localStorage.setItem('jwt_token', currentToken);
          localStorage.setItem('jwt_user', JSON.stringify(currentUser));
          updateSessionUi();

          alertBox.className = 'alert alert-success';
          alertBox.innerHTML = '✅ <strong>Đăng nhập thành công!</strong> Đã nhận JWT Access Token.';
          alertBox.style.display = 'block';

          // Tự động test profile ngay sau khi login
          testApi('/auth/profile', true);
        } else {
          alertBox.className = 'alert alert-error';
          alertBox.innerText = '❌ ' + (data.message || 'Đăng nhập thất bại');
          alertBox.style.display = 'block';
        }
      } catch (err) {
        alertBox.className = 'alert alert-error';
        alertBox.innerText = '❌ Lỗi kết nối đến máy chủ!';
        alertBox.style.display = 'block';
      }
    });

    // Submit Đăng ký (POST /auth/register)
    document.getElementById('formRegister').addEventListener('submit', async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('authAlert');
      alertBox.style.display = 'none';

      const payload = {
        name: document.getElementById('regName').value.trim(),
        username: document.getElementById('regUsername').value.trim(),
        password: document.getElementById('regPassword').value,
        role: document.getElementById('regRole').value
      };

      try {
        const res = await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok) {
          alertBox.className = 'alert alert-success';
          alertBox.innerHTML = '✅ <strong>Đăng ký thành công!</strong> Tài khoản đã được lưu vào CSDL. Hãy chuyển qua tab Đăng nhập.';
          alertBox.style.display = 'block';
          loadUsersTable(); // Cập nhật ngay bảng CSDL
          document.getElementById('regName').value = '';
          document.getElementById('regUsername').value = '';
          document.getElementById('regPassword').value = '';
        } else {
          alertBox.className = 'alert alert-error';
          alertBox.innerText = '❌ ' + (Array.isArray(data.message) ? data.message.join(', ') : data.message || 'Đăng ký thất bại');
          alertBox.style.display = 'block';
        }
      } catch (err) {
        alertBox.className = 'alert alert-error';
        alertBox.innerText = '❌ Lỗi kết nối đến máy chủ!';
        alertBox.style.display = 'block';
      }
    });

    // Kiểm thử API (Profile, Admin-only, or Unauthorized)
    async function testApi(url, attachToken) {
      const responseBox = document.getElementById('apiResponseBox');
      const statusBadge = document.getElementById('apiStatusBadge');
      responseBox.innerText = '// Đang gửi Request tới: ' + url + '...';

      const headers = {};
      if (attachToken && currentToken) {
        headers['Authorization'] = 'Bearer ' + currentToken;
      }

      try {
        const res = await fetch(url, { headers });
        const data = await res.json();
        const statusText = res.status + ' ' + res.statusText;
        if (res.ok) {
          statusBadge.innerHTML = '<span class="tag tag-user" style="margin-left:8px;">' + statusText + ' ✅</span>';
        } else if (res.status === 403) {
          statusBadge.innerHTML = '<span class="tag tag-admin" style="margin-left:8px;">' + statusText + ' 🚫 FORBIDDEN</span>';
        } else {
          statusBadge.innerHTML = '<span class="tag tag-admin" style="margin-left:8px;">' + statusText + ' ❌ UNAUTHORIZED</span>';
        }
        responseBox.innerText = JSON.stringify(data, null, 2);
      } catch (err) {
        statusBadge.innerHTML = '<span class="tag tag-admin" style="margin-left:8px;">ERROR</span>';
        responseBox.innerText = 'Lỗi gửi yêu cầu: ' + err.message;
      }
    }

    // Tải bảng Users CSDL (GET /auth/users)
    async function loadUsersTable() {
      const tbody = document.getElementById('usersTableBody');
      try {
        const res = await fetch('/auth/users');
        const users = await res.json();
        if (!users || users.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Chưa có người dùng nào trong CSDL.</td></tr>';
          return;
        }
        tbody.innerHTML = users.map(u => \`
          <tr>
            <td><span class="tag">#\${u.id}</span></td>
            <td><strong>\${u.username}</strong></td>
            <td>\${u.name}</td>
            <td>\${u.role === 'admin' ? '<span class="tag tag-admin">ADMIN</span>' : '<span class="tag tag-user">USER</span>'}</td>
            <td><code style="color:#94a3b8; font-size:11px;">\${u.passwordHashPreview}</code></td>
            <td>\${u.createdAt ? new Date(u.createdAt).toLocaleString('vi-VN') : '-'}</td>
          </tr>
        \`).join('');
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state" style="color:#f87171;">Lỗi tải dữ liệu người dùng.</td></tr>';
      }
    }

    // Switch CSDL Tab
    function switchDbTab(tab) {
      const tabUsersBtn = document.getElementById('tabUsersBtn');
      const tabBorrowedBtn = document.getElementById('tabBorrowedBtn');
      const tabUsersContent = document.getElementById('tabUsersContent');
      const tabBorrowedContent = document.getElementById('tabBorrowedContent');

      if (tab === 'users') {
        tabUsersBtn.classList.add('active');
        tabBorrowedBtn.classList.remove('active');
        tabUsersContent.style.display = 'block';
        tabBorrowedContent.style.display = 'none';
        loadUsersTable();
      } else {
        tabBorrowedBtn.classList.add('active');
        tabUsersBtn.classList.remove('active');
        tabUsersContent.style.display = 'none';
        tabBorrowedContent.style.display = 'block';
        loadBorrowedBooks();
      }
    }

    // --- CÁC HÀM CŨ: QUẢN LÝ SÁCH & ĐỘC GIẢ ---
    const today = new Date();
    today.setDate(today.getDate() + 14);
    document.getElementById('dueDateInput').value = today.toISOString().split('T')[0];

    const tabBook = document.getElementById('tabBook');
    const tabReader = document.getElementById('tabReader');
    const addBookForm = document.getElementById('addBookForm');
    const addReaderForm = document.getElementById('addReaderForm');

    tabBook.addEventListener('click', () => {
      tabBook.style.background = 'var(--primary)';
      tabReader.style.background = '#1e293b';
      addBookForm.style.display = 'block';
      addReaderForm.style.display = 'none';
    });

    tabReader.addEventListener('click', () => {
      tabReader.style.background = 'var(--primary)';
      tabBook.style.background = '#1e293b';
      addBookForm.style.display = 'none';
      addReaderForm.style.display = 'block';
    });

    async function loadReaders() {
      try {
        const res = await fetch('/readers');
        const readers = await res.json();
        const select = document.getElementById('readerSelect');
        select.innerHTML = '<option value="">-- Chọn Độc giả mượn --</option>';
        readers.forEach(r => {
          select.innerHTML += \`<option value="\${r.id}">\${r.id}. \${r.name} (\${r.email || r.phone || 'Chưa có SĐT'})\</option>\`;
        });
      } catch (err) { console.error(err); }
    }

    async function loadBooks() {
      try {
        const res = await fetch('/books');
        const books = await res.json();
        const select = document.getElementById('bookSelect');
        select.innerHTML = '<option value="">-- Chọn Sách cần mượn --</option>';
        books.forEach(b => {
          select.innerHTML += \`<option value="\${b.id}">\${b.id}. \${b.title} - \${b.author}\</option>\`;
        });
      } catch (err) { console.error(err); }
    }

    async function loadBorrowedBooks() {
      const tbody = document.getElementById('borrowedTableBody');
      try {
        const res = await fetch('/borrowed-records/borrowed-books');
        const list = await res.json();
        if (!list || list.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" class="empty-state">Chưa có bản ghi sách nào được mượn.</td></tr>';
          return;
        }
        tbody.innerHTML = list.map(item => \`
          <tr>
            <td><span class="tag">#\${item.book?.id || ''}</span></td>
            <td><strong>\${item.book?.title || 'N/A'}</strong></td>
            <td>\${item.book?.author || 'N/A'}</td>
            <td><strong style="color:#a5b4fc;">\${item.borrower?.name || 'N/A'}</strong></td>
            <td>\${item.borrower?.email || item.borrower?.phone || '-'}</td>
            <td>\${item.borrowDate ? new Date(item.borrowDate).toLocaleDateString('vi-VN') : ''}</td>
            <td><span style="color:#f59e0b; font-weight:600;">\${item.dueDate ? new Date(item.dueDate).toLocaleDateString('vi-VN') : ''}</span></td>
          </tr>
        \`).join('');
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state" style="color:#f87171;">Lỗi tải dữ liệu.</td></tr>';
      }
    }

    document.getElementById('borrowForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('borrowAlert');
      alertBox.style.display = 'none';
      const payload = {
        readerId: Number(document.getElementById('readerSelect').value),
        bookId: Number(document.getElementById('bookSelect').value),
        dueDate: document.getElementById('dueDateInput').value
      };
      try {
        const res = await fetch('/borrowed-records/borrow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok) {
          alertBox.className = 'alert alert-success';
          alertBox.innerHTML = '✅ <strong>Mượn sách thành công!</strong> Đã lưu vào CSDL (Mã phiếu mượn #' + data.id + ')';
          alertBox.style.display = 'block';
          loadBorrowedBooks();
        } else {
          alertBox.className = 'alert alert-error';
          alertBox.innerText = '❌ ' + (data.message || 'Mượn sách thất bại');
          alertBox.style.display = 'block';
        }
      } catch (err) {
        alertBox.className = 'alert alert-error';
        alertBox.innerText = '❌ Lỗi kết nối máy chủ.';
        alertBox.style.display = 'block';
      }
    });

    document.getElementById('addBookForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('quickAddAlert');
      const title = document.getElementById('newBookTitle').value;
      const author = document.getElementById('newBookAuthor').value;
      try {
        const res = await fetch('/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, author })
        });
        if (res.ok) {
          alertBox.className = 'alert alert-success';
          alertBox.innerText = '✅ Thêm sách mới thành công!';
          alertBox.style.display = 'block';
          document.getElementById('newBookTitle').value = '';
          document.getElementById('newBookAuthor').value = '';
          loadBooks();
        }
      } catch (err) {
        alertBox.className = 'alert alert-error';
        alertBox.innerText = '❌ Thêm sách thất bại.';
        alertBox.style.display = 'block';
      }
    });

    document.getElementById('addReaderForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const alertBox = document.getElementById('quickAddAlert');
      const name = document.getElementById('newReaderName').value;
      const email = document.getElementById('newReaderEmail').value;
      const phone = document.getElementById('newReaderPhone').value;
      try {
        const res = await fetch('/readers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email: email || undefined, phone: phone || undefined })
        });
        if (res.ok) {
          alertBox.className = 'alert alert-success';
          alertBox.innerText = '✅ Thêm độc giả mới thành công!';
          alertBox.style.display = 'block';
          document.getElementById('newReaderName').value = '';
          document.getElementById('newReaderEmail').value = '';
          document.getElementById('newReaderPhone').value = '';
          loadReaders();
        }
      } catch (err) {
        alertBox.className = 'alert alert-error';
        alertBox.innerText = '❌ Thêm độc giả thất bại.';
        alertBox.style.display = 'block';
      }
    });

    // Khởi tạo ban đầu
    updateSessionUi();
    loadUsersTable();
    loadReaders();
    loadBooks();
    loadBorrowedBooks();
  </script>
</body>
</html>`;
  }
}
