import { HttpException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { JwtService } from '@nestjs/jwt';
import *as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private dbService: DbService, private jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    const user = this.dbService.findUser(username);
    if (user?.password === password) {
      const { password, ...data } = user;
      return data;
    }
    return null;
  }

async login(user: any) {
    console.log("user auth service : ",user)
    const payload = { username: user.username, sub: user.password };
    console.log("payload : ",user)
    const hashedPass  = await bcrypt.hash(user.password, 10)
    console.log(hashedPass)
    console.log(await bcrypt.genSalt())
    return {
       access_token: this.jwtService.sign(payload)
    };
  }
}
