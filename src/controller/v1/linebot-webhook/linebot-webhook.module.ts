import { Module } from '@nestjs/common';
import { LinebotWebhookService } from './linebot-webhook.service';
import { LinebotWebhookController } from './linebot-webhook.controller';
import { PostchainSdkModule } from '../postchain-sdk/postchain-sdk.module';
import { HttpModule } from '@nestjs/axios';
import { LinebotUserModule } from '../linebot-user/linebot-user.module';
import { SignatureValidateGuard } from './guard/signature-validate.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PostchainSdkModule, HttpModule, LinebotUserModule],
  controllers: [LinebotWebhookController],
  providers: [LinebotWebhookService],
})
export class LinebotWebhookModule {}
