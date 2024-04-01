import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto, RefreshTokenDto, ViewTokensDto } from './auth.dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserService, ViewUserDto } from '../user';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<ViewUserDto> {
    const user = await this.userService.createNewUser(userData);
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post('login')
  async logIn(
    @Body(new ValidationPipe()) loginData: LogInDto,
  ): Promise<ViewTokensDto> {
    const tokens = await this.authService.logIn(loginData);
    return plainToInstance(ViewTokensDto, tokens);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  async refresh(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNAUTHORIZED,
      }),
    )
    refreshData: RefreshTokenDto,
  ): Promise<ViewTokensDto> {
    const tokens = await this.authService.refresh(refreshData);
    return plainToInstance(ViewTokensDto, tokens);
  }
}
