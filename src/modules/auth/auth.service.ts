import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LogInDto, RefreshTokenDto } from './auth.dto';
import { UserEntity } from '../user';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private env: EnvService) {}

  private generateTokens = async (payload: {
    userId: string;
    login: string;
  }) => {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.env.TOKEN_EXPIRE_TIME_MS,
      secret: this.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.env.TOKEN_REFRESH_EXPIRE_TIME_MS,
      secret: this.env.JWT_SECRET_REFRESH_KEY,
    });

    return { accessToken, refreshToken };
  };

  async logIn({ login, password }: LogInDto) {
    const user = await UserEntity.findOneBy({
      login: login,
    });

    if (!user) {
      throw new HttpException(
        `User with login ${login} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new HttpException(
        'Login or password is invalid',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.generateTokens({
      login,
      userId: user.id,
    });
  }

  async refresh({ refreshToken }: RefreshTokenDto) {
    try {
      const { userId } = await this.jwtService.verifyAsync<{ userId: string }>(
        refreshToken,
        {
          secret: this.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      const user = await UserEntity.findOneBy({
        id: userId,
      });

      if (!user) {
        throw new HttpException(`Invalid token`, HttpStatus.FORBIDDEN);
      }

      return this.generateTokens({
        login: user.login,
        userId: user.id,
      });
    } catch {
      throw new HttpException(`Invalid token`, HttpStatus.FORBIDDEN);
    }
  }
}
