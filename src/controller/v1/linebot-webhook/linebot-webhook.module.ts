import { Module } from '@nestjs/common';
import { LinebotWebhookService } from './linebot-webhook.service';
import { LinebotWebhookController } from './linebot-webhook.controller';
import { PostchainSdkModule } from '../postchain-sdk/postchain-sdk.module';
import { HttpModule } from '@nestjs/axios';
import { LinebotUserModule } from '../linebot-user/linebot-user.module';

@Module({
  imports: [PostchainSdkModule, HttpModule, LinebotUserModule],
  controllers: [LinebotWebhookController],
  providers: [LinebotWebhookService],
})
export class LinebotWebhookModule {}
