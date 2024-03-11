import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { compare, hash } from 'bcrypt';
import { ENV } from 'src/constants';

@Injectable()
export class UserService {
  createNewUser({ password, login }: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.login = login;
    user.password = password;

    return user.save();
  }

  getAll() {
    return UserEntity.find();
  }

  getById(userId: string): Promise<UserEntity> {
    return UserEntity.findOneBy({
      id: userId,
    });
  }

  async updatePassword(
    userId: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await UserEntity.findOneBy({
      id: userId,
    });

    const isCorrectOldPassword = await compare(oldPassword, user.password);

    if (!isCorrectOldPassword) {
      throw new HttpException(
        'Provided oldPassword is wrong',
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = await hash(newPassword, ENV.CRYPT_SALT);

    return user.save();
  }

  async deleteUser(userId: string): Promise<void> {
    UserEntity.delete({
      id: userId,
    });
  }
}
