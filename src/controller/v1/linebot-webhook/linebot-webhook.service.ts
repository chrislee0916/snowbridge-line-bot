import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { Body, Injectable } from '@nestjs/common';
import { PostchainSdkService } from '../postchain-sdk/postchain-sdk.service';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { LinebotUserService } from '../linebot-user/linebot-user.service';

@Injectable()
export class LinebotWebhookService {

  constructor(
    private readonly postchainSdkService: PostchainSdkService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly lineBotUserService: LinebotUserService
  ){}

  async create(@Body() body: WebhookRequestBody) {
    const events: Array<WebhookEvent> = body.events;

    for(let item of events) {
      if(item.type === 'follow') {
        const userId: string = item.source.userId;
        // 是否已簽名過
        let isSignature: any = await this.postchainSdkService.getSignatureList(userId, '', '', 25, 0, 1);
        // console.log('isSignature: ', isSignature)
        if(isSignature.length) {
          // 更換選單
          await this.lineBotUserService.changeMenu2ShowFile(userId);
          continue
        }

        // 是否已簽名過
        let isSignIn: any = await this.postchainSdkService.getSignInList(userId, '', '', 25, 0, 1);
        if(isSignIn.length) {
          // 更換選單
          await this.lineBotUserService.changeMenu2Signature(userId);
        }
      }
    }
  }
}
