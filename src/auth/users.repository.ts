import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException } from '@nestjs/common/exceptions';
import errors from 'src/config/errors.config';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findBy({ username });
    if (user) {
      throw new ConflictException(errors.userNameAlreadyExists);
    }

    const newUser = await this.usersRepository.create({
      username,
      password,
    });
    await this.usersRepository.save(newUser);
  }
}
