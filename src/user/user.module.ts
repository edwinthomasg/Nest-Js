// import { Module } from '@nestjs/common';
// import { ProfessionalGreetingService } from './casualService';
// import { GREETING_SERVICE } from './service.interface';
// import { GreetingController } from './user.controller';

// @Module({
//     imports: [ConfigModule.register({ folder: './config' })],
//     providers: [
//         {
//             useClass: ProfessionalGreetingService,
//             provide: GREETING_SERVICE,
//         }
//     ],
//     controllers: [GreetingController]
// })
// export class GreetModule {
//     static register(): DynamicModule {
//         return {
//           module: ConfigModule,
//           providers: [ConfigService],
//           exports: [ConfigService],
//         };
//       }
// }
