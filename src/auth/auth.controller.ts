import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthGuard } from './guards/auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { Roles } from './decorators/roles.decorator.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { UserRole } from './entities/user.entity.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. API Đăng ký tài khoản (Public)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  // 2. API Đăng nhập & Tạo JWT Token (Public)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  // 3. API Xem thông tin cá nhân (Yêu cầu Authentication: phải có Bearer Token)
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    const profile = await this.authService.getProfile(user.sub);
    return {
      message: 'Xác thực Authentication thành công!',
      jwtPayload: user,
      userProfile: profile,
    };
  }

  // 4. API Dành riêng cho Quản trị viên (Yêu cầu Authorisation: Role = ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin-only')
  getAdminDashboard(@CurrentUser() user: any) {
    return {
      message: 'Ủy quyền Authorisation thành công! Chào mừng Quản trị viên.',
      currentUser: user,
      permissionGranted: true,
      timestamp: new Date().toISOString(),
    };
  }

  // 5. API Liệt kê danh sách tài khoản trong CSDL (Hỗ trợ nộp ảnh CSDL và kiểm tra)
  @Get('users')
  async getAllUsers() {
    return await this.authService.findAllUsers();
  }
}
