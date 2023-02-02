import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { lastValueFrom, map, Observable } from 'rxjs';
import { LoggerServices } from 'src/logger/logger.service';
import { CreateDto } from './dto/create-user.dto';
import { UpdateDto } from './dto/update-user.dto';
import { UsersDocument, USERS_MODEL } from './schema/user.schema';

@Injectable()
export class ValidationService {
  constructor(
    @InjectModel(USERS_MODEL) private userModel: Model<UsersDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private loggerService: LoggerServices,
    private eventEmitter: EventEmitter2,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async createUser(user: CreateDto) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async updateUser(user: UpdateDto, id: string) {
    return await this.userModel.updateOne({ _id: id }, user);
  }

  async getUser() {
    console.log(this.configService.get('production'));
    console.log('http : ', this.configService.get('http'));
    console.log('deploy : ', this.configService.get('deploy'));
    this.loggerService.log('hello logger');
    this.eventEmitter.emit('user.data', 'data loaded');
    if (!(await this.cacheManager.get('users'))) {
      console.log('called from db');
      const data = await this.userModel.find({});
      console.log(data);
      this.eventEmitter.emit('user.db', 'data loaded from db');
      await this.cacheManager.set('users', data, 2000);
      // return await this.cacheManager.get('users');
    } else {
      console.log('from cache');
      this.eventEmitter.emit('user.cache', 'data loaded from cache');
      // return await this.cacheManager.get('users');
    }
  }

  async getApiData(): Promise<Observable<AxiosResponse<any>>> {
    const observable = this.httpService
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(map((res) => res.data));
    return await lastValueFrom(observable);
  }
}
