import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { UserDto } from '../dto/User.dto';
import { User, UserDocument } from '../schemas/user.schema';

export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsersData(filterQuery: FilterQuery<User>): Promise<User[]> {
    return await this.userModel.find(filterQuery);
  }

  async getUserData(filterQuery: FilterQuery<User>){
    return await this.userModel.findById(filterQuery['_id'])
  }

  async getUserById(filterQuery: FilterQuery<User>) {
    return await this.userModel.find(filterQuery)
  }

  async createUserData(user: UserDto): Promise<User> {
    const newUser = new this.userModel(user)
    return await newUser.save()
  }

  async updateUserById(user: UserDto, filterQuery: UpdateQuery<User>){
    return await this.userModel.findByIdAndUpdate(filterQuery['_id'], user)
  }
}
