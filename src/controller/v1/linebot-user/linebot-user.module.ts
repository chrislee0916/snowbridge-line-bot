import { Module } from '@nestjs/common';
import { LinebotUserService } from './linebot-user.service';
import { LinebotUserController } from './linebot-user.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PostchainSdkModule } from '../postchain-sdk/postchain-sdk.module';

@Module({
  imports: [HttpModule, PostchainSdkModule],
  controllers: [LinebotUserController],
  providers: [LinebotUserService],
})
export class LinebotUserModule {}
