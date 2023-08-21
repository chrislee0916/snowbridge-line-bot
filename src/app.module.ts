import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ParseBaseQueryMiddleware } from './middleware/parseBaseQuery.middleware';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './controller/auth/auth.module';
import { AuthGuard } from './controller/auth/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './controller/auth/auth.service';
import { Auth, AuthSchema } from './controller/auth/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ControllerModule_v1 } from './controller/v1/v1.module';
import { UserService } from './controller/v1/user/user.service';
import { User, UserSchema } from './controller/v1/user/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath:
        process.env.NODE_ENV === 'prod'
          ? ['.env.production.local', '.env.production', '.env']
          : process.env.NODE_ENV === 'dev'
          ? ['.env.development.local', '.env.development', '.env']
          : process.env.NODE_ENV === 'test'
          ? ['.env.test.local', '.env.test', '.env']
          : '.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
    ControllerModule_v1,
  ],
  providers: [
    AuthService,
    JwtService,
    AppService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ParseBaseQueryMiddleware).forRoutes('*');
  }
}
