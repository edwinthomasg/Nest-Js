import { CACHE_MANAGER, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { LoggerServices } from 'src/logger/logger.service';
import { CreateDto } from './dto/create-user.dto';
import { UpdateDto } from './dto/update-user.dto';
import { UsersDocument, USERS_MODEL } from './schema/user.schema';

@Injectable()
export class ValidationService {
  constructor(
    @InjectModel(USERS_MODEL) private userModel: Model<UsersDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private loggerService: LoggerServices
  ) {}
  
  async createUser(user: CreateDto) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async updateUser(user: UpdateDto, id: string) {
    return await this.userModel.updateOne({ _id: id }, user);
  }

  async getUser() {
    this.loggerService.log("hello logger")
    if (!(await this.cacheManager.get('users'))) {
      console.log("called from db")
      const data = await this.userModel.find({})
      console.log(data)
      await this.cacheManager.set('users', data, 2000);
      return await this.cacheManager.get('users');
    } else {
      console.log('from cache');
      return await this.cacheManager.get('users');
    }
  }
}
