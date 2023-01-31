import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions() {
    console.log(this.configService.get('database'))
    return this.configService.get('database');
  }
  
}
