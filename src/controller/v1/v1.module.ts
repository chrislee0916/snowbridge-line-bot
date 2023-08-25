import { Module } from '@nestjs/common';
import { UserModule_v1 } from './user/user.module';
import { LinebotUserModule } from './linebot-user/linebot-user.module';
import { DefaultPdfModule } from './default-pdf/default-pdf.module';
import { PostchainSdkModule } from './postchain-sdk/postchain-sdk.module';

@Module({
  imports: [UserModule_v1, LinebotUserModule, DefaultPdfModule, PostchainSdkModule],
})
export class ControllerModule_v1 {}
