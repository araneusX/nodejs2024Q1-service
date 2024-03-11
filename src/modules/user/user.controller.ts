import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
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
  async create(@Body() userData: CreateUserDto): Promise<ViewUserDto> {
    const user = await this.userService.createNewUser(userData);
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':userId')
  async updatePassword(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() passwordData: UpdatePasswordDto,
  ): Promise<ViewUserDto> {
    const user = await this.userService.updatePassword(userId, passwordData);
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':userId')
  deleteUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    this.userService.deleteUser(userId);
  }
}
