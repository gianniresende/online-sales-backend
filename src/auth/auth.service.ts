import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = { ...new LoginPayloadDto(user) };

    return {
      accessToken: this.jwtService.sign(payload),
      user: new ReturnUserDto(user),
    };
  }
}
