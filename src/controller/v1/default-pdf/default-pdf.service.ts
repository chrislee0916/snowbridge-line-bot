import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateDefaultPdfDto } from 'src/controller/dto/default-pdf-create.dto';
import { DefaultResponsesDto } from 'src/controller/dto/default.dto';
import { PostchainSdkService } from '../postchain-sdk/postchain-sdk.service';


@Injectable()
export class DefaultPdfService {
  keyObj: any = {}
  constructor(
    private readonly configService: ConfigService,
    private readonly postchainService: PostchainSdkService
  ){
    const privateKey: string = this.configService.get('POSTCHAIN_PRIVATE_KEY')
    const publicKey: string = this.configService.get('POSTCHAIN_PUBLIC_KEY')
    this.keyObj.privKey = Buffer.from(privateKey, 'hex')
    this.keyObj.pubKey = Buffer.from(publicKey, 'hex')
  }

  async create(createDefaultPdfDto: CreateDefaultPdfDto): Promise<DefaultResponsesDto> {
    try {
      const { file } = createDefaultPdfDto;
      const now = new Date().getTime();
      await this.postchainService.uploadTemplate(this.keyObj, file, now)
      return { success: true }
    } catch (err) {
      throw new InternalServerErrorException(err.status || this.configService.get('ERR_SYSTEM_ERROR'));
    }

  }

  //  查詢檔案
  async findAll() {
    try {
      let resp = await this.postchainService.getTemplate();
      return resp;
    } catch (err) {
      throw new InternalServerErrorException(err.status || this.configService.get('ERR_SYSTEM_ERROR'));
    }

  }
}
