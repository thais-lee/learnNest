import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAppConfig } from 'src/config/app.config';
import { IAuthConfig } from 'src/config/auth.config';
import { CreateUserDto } from '../users/dto/user-info.dto';
import { UsersService } from '../users/users.service';
import { RegisterResponseDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IAppConfig & IAuthConfig>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(registerDto: CreateUserDto): Promise<RegisterResponseDto> {
    if (!!(await this.usersService.findByUsername(registerDto.username))) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Username has already exist',
        },
        HttpStatus.CONFLICT,
      );
    }

    registerDto.password = bcrypt.hashSync(registerDto.password, 10);

    const user = await this.usersService.createUser(registerDto);

    return {
      token: this._generatedToken(user.id),
      user: user,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByUsername(loginDto.username);

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not found username',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Wrong password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      token: this._generatedToken(user.id),
      user: user,
    };
  }

  private _generatedToken(userId: string, isLongExpired = false): string {
    return this.jwtService.sign(
      { userId },
      {
        expiresIn: 86400,
        secret: 'secret',
      },
    );
  }
}
