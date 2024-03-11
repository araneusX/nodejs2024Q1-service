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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, ViewUserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: ViewUserDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers(): Promise<ViewUserDto[]> {
    const users = await this.userService.getAll();
    return plainToInstance(ViewUserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':userId')
  @ApiOkResponse({
    type: ViewUserDto,
  })
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
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    type: ViewUserDto,
  })
  async create(@Body() userData: CreateUserDto): Promise<ViewUserDto> {
    const user = await this.userService.createNewUser(userData);
    return plainToInstance(ViewUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':userId')
  @ApiBody({
    type: UpdatePasswordDto,
  })
  @ApiCreatedResponse({
    type: ViewUserDto,
  })
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
