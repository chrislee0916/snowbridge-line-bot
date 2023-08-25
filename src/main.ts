import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: '*', // 或你允許的具體來源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  } });
  const configService = app.get(ConfigService);
  Logger.log(configService.get('SERVER_NAME'), ' 啟動服務 ');
  Logger.log(configService.get('VERSION'), '   版本   ');
  Logger.log(configService.get('SERVER_PORT'), '   port   ');

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))

  const options = new DocumentBuilder()
    .setTitle('Template Server API')
    .setDescription('API 僅供參考')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .addServer(`http://localhost:${configService.get('SERVER_PORT')}/api`)
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('apidoc', app, document);

  await app.listen(configService.get('SERVER_PORT'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
