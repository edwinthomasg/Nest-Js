import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  testMethod(): string {
    return "test method says hi to the browser !!"
  }
}
