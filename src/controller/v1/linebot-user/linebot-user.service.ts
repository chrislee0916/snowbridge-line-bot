import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateDefaultPdfDto } from 'src/controller/dto/default-pdf-create.dto';
import { LinebotUserDocument } from './linebot-user.schema';
import { CreateLinebotUserDto } from 'src/controller/dto/linebot-user-create.dto';
import { DefaultResponsesDto } from 'src/controller/dto/default.dto';
import { ConfigService } from '@nestjs/config';
import { Client } from '@line/bot-sdk';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { LinebotUserCheckInShowResponsesDto, LinebotUserShowResponsesDto } from 'src/controller/dto/linebot-user-show_response.dto';
import { LinebotUserListDto } from 'src/controller/dto/linebot-user-list.dto';
import { LinebotUserCheckInListResponsesDto, LinebotUserListResponsesDto } from 'src/controller/dto/linebot-user-list_response.dto';
import { PostchainSdkService } from '../postchain-sdk/postchain-sdk.service';


@Injectable()
export class LinebotUserService {
  keyObj: any = {}
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly postchainService: PostchainSdkService,
  ){
    const privateKey: string = this.configService.get('POSTCHAIN_PRIVATE_KEY');
    const publicKey: string = this.configService.get('POSTCHAIN_PUBLIC_KEY');
    this.keyObj.privKey = Buffer.from(privateKey, 'hex');
    this.keyObj.pubKey = Buffer.from(publicKey, 'hex');
  }

  // 簽到
  async checkIn(createLinebotUserDto: CreateLinebotUserDto): Promise<LinebotUserShowResponsesDto> {
    try {
      const { userId, name, phone } = createLinebotUserDto;

      await this.checkUserIdIsExist(userId);

      // 使用 blockchain SDK => 簽到
      const now = new Date().getTime();
      let resp: any = await this.postchainService.createSignIn(this.keyObj, userId, name, phone, now);

      // 更換選單
      await this.changeMenu2Signature(userId);

      return {
        userId,
        name,
        phone,
        createdAt: now
      }
    } catch (err) {
      console.log(err)
      if(err.isAxiosError) {
        throw new HttpException(err.response?.data?.message, err.response.status)
      } else if(err.status === 'rejected') {
        throw new BadRequestException('錯誤的請求');
      }
      throw new InternalServerErrorException(this.configService.get('ERR_SYSTEM_ERROR'));
    }
  }

  // 簽名
  async signature(userId: string, createDefaultPdfDto: CreateDefaultPdfDto): Promise<DefaultResponsesDto>{
    try {

      await this.checkUserIdIsExist(userId);
      // 使用 blockchain SDK => 簽名
      const { file } = createDefaultPdfDto;
      const now = new Date().getTime();
      await this.postchainService.createSignature(this.keyObj, userId, file, now);

      // 更換選單
      await this.changeMenu2ShowFile(userId);

      return { success: true }
    } catch (err) {
      console.log(err)
      if(err.isAxiosError) {
        throw new HttpException(err.response?.data?.message, err.response.status)
      } else if(err.status === 'rejected') {
        throw new BadRequestException('錯誤的請求');
      }
      throw new InternalServerErrorException(this.configService.get('ERR_SYSTEM_ERROR'));
    }
  }


  // 所有簽到列表
  async findAllCheckIn(query: LinebotUserListDto): Promise<unknown>  {
    try {
      // 使用 blockchain SDK => 簽到列表
      const { userId, name, phone, limit, skip, sort } = query;
      let resp = await this.postchainService.getSignInList(userId, name, phone, limit, skip, sort);
      const total: any = await this.postchainService.getSignInList(userId, name, phone, 0, 0, -1);

      return {
        total: total.length,
        limit,
        skip,
        sort,
        items: resp,
      }
    } catch (err) {
      console.log(err)
      if(err.status) {
        throw new BadRequestException('錯誤的請求')
      }
      throw new InternalServerErrorException(this.configService.get('ERR_SYSTEM_ERROR'));
    }
  }

  // 所有簽名列表
  async findAllSignature(query: LinebotUserListDto): Promise<unknown>{
    try {
      // 使用 blockchain SDK => 簽名列表
      const { userId, name, phone, limit, skip, sort } = query;
      let resp = await this.postchainService.getSignatureList(userId, name, phone, limit, skip, sort)
      const total: any = await this.postchainService.getSignatureList(userId, name, phone, 0, 0, -1);

      return {
        total: total.length,
        limit,
        skip,
        sort,
        items: resp,
      }

    } catch (err) {
      console.log(err)
      if(err.status) {
        throw new BadRequestException('錯誤的請求')
      }
      throw new InternalServerErrorException(this.configService.get('ERR_SYSTEM_ERROR'));

    }
  }

  checkUserIdIsExist(userId: string) {
    return firstValueFrom(this.httpService.get(`https://api.line.me/v2/bot/profile/${userId}`,
      {
      headers: {
        Authorization: `Bearer ${this.configService.get('LINEBOT_ACCESS_TOKEN')}`
      }
    }))
  }

  changeMenu2Signature(userId: string) {
    return firstValueFrom(this.httpService.post(`https://api.line.me/v2/bot/user/${userId}/richmenu/${this.configService.get('LINEBOT_SIGNATURE_MENU')}`,
      {}, {
      headers: {
        Authorization: `Bearer ${this.configService.get('LINEBOT_ACCESS_TOKEN')}`
      }
    }))
  }

  changeMenu2ShowFile(userId: string){
    return firstValueFrom(this.httpService.post(`https://api.line.me/v2/bot/user/${userId}/richmenu/${this.configService.get('LINEBOT_SHOWFILE_MENU')}`,
        {}, {
        headers: {
          Authorization: `Bearer ${this.configService.get('LINEBOT_ACCESS_TOKEN')}`
        }
      }))
  }

}
