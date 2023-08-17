import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  Logger.log(configService.get('SERVER_NAME'), ' 啟動服務 ');
  Logger.log(configService.get('VERSION'), '   版本   ');
  Logger.log(configService.get('SERVER_PORT'), '   port   ');

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(configService.get('SERVER_PORT'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
