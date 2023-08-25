import { Module } from '@nestjs/common';
import { PostchainSdkService } from './postchain-sdk.service';

@Module({
  providers: [PostchainSdkService],
  exports: [PostchainSdkService]
})
export class PostchainSdkModule {}
