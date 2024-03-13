import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { compare, hash } from 'bcrypt';
import { EnvService } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private readonly envService: EnvService) {}

  async createNewUser({ password, login }: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.login = login;
    user.password = await hash(password, this.envService.CRYPT_SALT);

    return user.save();
  }

  getAll() {
    return UserEntity.find();
  }

  async getById(userId: string): Promise<UserEntity> {
    const user = await UserEntity.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async updatePassword(
    userId: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await UserEntity.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new HttpException(
        `User with id ${userId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isCorrectOldPassword = await compare(oldPassword, user.password);

    if (!isCorrectOldPassword) {
      throw new HttpException(
        'Provided oldPassword is wrong',
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = await hash(newPassword, this.envService.CRYPT_SALT);

    return user.save();
  }

  async deleteUser(userId: string): Promise<void> {
    const { affected } = await UserEntity.delete({
      id: userId,
    });

    if (!affected) {
      throw new HttpException(
        `User with id ${userId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
