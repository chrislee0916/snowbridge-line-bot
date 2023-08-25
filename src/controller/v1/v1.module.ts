import { Module } from '@nestjs/common';
import { LinebotUserModule } from './linebot-user/linebot-user.module';
import { DefaultPdfModule } from './default-pdf/default-pdf.module';
import { PostchainSdkModule } from './postchain-sdk/postchain-sdk.module';

@Module({
  imports: [LinebotUserModule, DefaultPdfModule, PostchainSdkModule],
})
export class ControllerModule_v1 {}
