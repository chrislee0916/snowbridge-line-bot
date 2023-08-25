import { Module } from '@nestjs/common';
import { DefaultPdfService } from './default-pdf.service';
import { DefaultPdfController } from './default-pdf.controller';
import { PostchainSdkModule } from '../postchain-sdk/postchain-sdk.module';


@Module({
  imports: [PostchainSdkModule],
  controllers: [DefaultPdfController],
  providers: [DefaultPdfService],
})
export class DefaultPdfModule {}
