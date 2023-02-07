import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AppAuthController } from './app-auth.controller';
import { AppAuthService } from './app-auth.service';


@Module({
  imports: [AuthModule],
  controllers: [AppAuthController],
  providers: [AppAuthService]
})
export class AppAuthModule {}
