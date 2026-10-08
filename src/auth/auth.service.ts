import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { User, UserRole } from './entities/user.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Khởi tạo tài khoản mẫu khi ứng dụng khởi chạy (nếu CSDL chưa có tài khoản)
  async onModuleInit() {
    const count = await this.userRepository.count();
    if (count === 0) {
      const hashedAdminPassword = await bcrypt.hash('admin123', 10);
      const hashedUserPassword = await bcrypt.hash('123456', 10);

      await this.userRepository.save([
        {
          username: 'admin',
          password: hashedAdminPassword,
          name: 'Quản trị viên Thư viện (Admin)',
          role: UserRole.ADMIN,
        },
        {
          username: 'user1',
          password: hashedUserPassword,
          name: 'Độc giả Nguyễn Văn A',
          role: UserRole.USER,
        },
      ]);
      console.log('✅ [AuthService] Đã tạo sẵn 2 tài khoản mẫu trong CSDL: admin (admin123) & user1 (123456)');
    }
  }

  // 1. Đăng ký tài khoản mới (Register)
  async register(dto: RegisterDto) {
    const existing = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException(`Tài khoản username '${dto.username}' đã tồn tại trong hệ thống`);
    }

    // Mã hóa mật khẩu an toàn với bcrypt (salt 10)
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepository.create({
      username: dto.username,
      password: hashedPassword,
      name: dto.name,
      role: dto.role || UserRole.USER,
    });

    const savedUser = await this.userRepository.save(newUser);

    // Không trả về mật khẩu cho client
    const { password, ...result } = savedUser;
    return {
      message: 'Đăng ký tài khoản thành công',
      user: result,
    };
  }

  // 2. Xác thực thông tin đăng nhập (Validate user credentials)
  async validateUser(username: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const { password, ...result } = user;
    return result;
  }

  // 3. Đăng nhập và tạo JWT Token (Login)
  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.username, dto.password);

    // Payload lưu trữ trong JWT token
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Đăng nhập thành công',
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: '1d',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    };
  }

  // 4. Lấy thông tin tài khoản hiện tại (Profile)
  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản người dùng');
    }
    const { password, ...result } = user;
    return result;
  }

  // 5. Liệt kê tất cả người dùng trong CSDL (Dành cho việc kiểm tra CSDL / Demo)
  async findAllUsers() {
    const users = await this.userRepository.find({
      order: { id: 'ASC' },
    });
    return users.map(({ password, ...rest }) => ({
      ...rest,
      passwordHashPreview: password.substring(0, 15) + '...', // hiển thị chuỗi băm để chứng minh đã mã hóa
    }));
  }
}
