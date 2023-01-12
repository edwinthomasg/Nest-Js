import { Injectable } from '@nestjs/common';
import { IGreetingService } from './service.interface';

@Injectable()
export class PersonalGreetingService implements IGreetingService {
  public async greet(name: string): Promise<string> {
    return `Yo what up ${name}!`;
  }
}