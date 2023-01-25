import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { Update } from './decorators/body.decorator';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/User.dto';
import { ForbiddenFilter } from './filters/forbidden.filter';
import { UserInterceptor } from './interceptors/user.interceptor';
import { IdPipe } from './pipes/number.pipe';
import { User } from './schemas/user.schema';
import { TestService } from './test.service';
import * as bcrypt from 'bcrypt'

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get('users')
  async getUsersData(): Promise<User[]> {
    return await this.testService.getUsersData();
  }

  @Get('users/:id')
  @UseInterceptors(UserInterceptor)
  getUserData(@Param('id') id: string) {
    return this.testService.getUserData(id);
  }

  @Get('users/personal/:id')
  getUserById(@Param('id', new IdPipe()) id: number) {
    return this.testService.getUserById(id);
  }

  @Post('users')
  @UseFilters(ForbiddenFilter)
  async createUser(@Body(new ValidationPipe()) user: UserDto) {
    console.log(user)
    // throw new HttpException("mmm", HttpStatusCode.Forbidden)
    return await this.testService.createUserData(user);
  }

  @Put('users/:id')
  updateUserById(@Update() user: UserDto, @Param('id') id: string) {
    return this.testService.updateUserById(user, id);
  }

  @Post('users/login')
  async loginUser(@Body() login: LoginDto) {
    // const random = randomBytes(16);
    // const password = login.password;
    // const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    // const cipher = createCipheriv('aes-256-ctr', key, random);
    // console.log(cipher);
    // const textToEncrypt = 'Nest';
    // const encryptedText = Buffer.concat([
    //   cipher.update(textToEncrypt),
    //   cipher.final(),
    // ]);
    // const decipher = createCipheriv('aes-256-ctr', key, random);
    // const decryptedText = Buffer.concat([
    //   decipher.update(encryptedText),
    //   decipher.final(),
    // ]);
    // console.log(decryptedText)
    const salt = 10
    const hash = await bcrypt.hash(login.password, await bcrypt.genSalt(salt))
    console.log(hash)
    console.log(await bcrypt.compare(login.password, hash))
  }
}
