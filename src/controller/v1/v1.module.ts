import { Module } from '@nestjs/common';
import { LinebotUserModule } from './linebot-user/linebot-user.module';
import { DefaultPdfModule } from './default-pdf/default-pdf.module';
import { PostchainSdkModule } from './postchain-sdk/postchain-sdk.module';
import { LinebotWebhookModule } from './linebot-webhook/linebot-webhook.module';

@Module({
  imports: [LinebotUserModule, DefaultPdfModule, PostchainSdkModule, LinebotWebhookModule],
})
export class ControllerModule_v1 {}
