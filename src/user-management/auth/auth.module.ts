import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from '../db/db.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalPassportStrategy } from './local.passport.strategy';

@Module({
  imports: [DbModule, PassportModule,JwtModule.register({
    secret: "hello world",
    signOptions: { expiresIn: '60s'}
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalPassportStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
