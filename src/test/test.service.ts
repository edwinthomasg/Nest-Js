import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { UserRepository } from './respository/test.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class TestService {
  constructor(private userRepository: UserRepository) {}

  async getUsersData(): Promise<User[]>{
    return await this.userRepository.getUsersData({})
  }

  async getUserData(id: string){
    return await this.userRepository.getUserData({_id: id})
  }

  async getUserById(id: number){
    return await this.userRepository.getUserById({id})
  }

  async createUserData(user: UserDto): Promise<User> {
    return await this.userRepository.createUserData(user)
  }

  async updateUserById(user: UserDto, id: string) {
    return await this.userRepository.updateUserById(user, {_id: id})
  }
}
