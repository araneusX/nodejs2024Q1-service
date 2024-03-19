import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, ViewUserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers(): Promise<ViewUserDto[]> {
    const users = await this.userService.getAll();
    return plainToInstance(ViewUserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':userId')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserById(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<ViewUserDto> {
    const user = await this.userService.getById(userId);
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<ViewUserDto> {
    const user = await this.userService.createNewUser(userData);
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':userId')
  async updatePassword(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body(new ValidationPipe()) passwordData: UpdatePasswordDto,
  ): Promise<ViewUserDto> {
    const user = await this.userService.updatePassword(userId, passwordData);
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
