import { WebhookEvent, WebhookRequestBody, MessageEvent, Client, Config, ReplyableEvent } from '@line/bot-sdk';
import { Body, Injectable } from '@nestjs/common';
import { PostchainSdkService } from '../postchain-sdk/postchain-sdk.service';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { LinebotUserService } from '../linebot-user/linebot-user.service';
import { SignatureValidateGuard } from './guard/signature-validate.guard';

@Injectable()
export class LinebotWebhookService {
  client: Client
  constructor(
    private readonly postchainSdkService: PostchainSdkService,
    private readonly configService: ConfigService,
  ){
    const config = {
      channelAccessToken: this.configService.get('LINEBOT_ACCESS_TOKEN'),
      channelSecret: this.configService.get('LINEBOT_CHANNEL_SECRET'),
    }
    this.client = new Client(config)
  }

  // 原本使用來判斷如果 follow 給予相對應選單
  // async create(@Body() body: WebhookRequestBody) {
  //   const events: Array<WebhookEvent> = body.events;

  //   for(let item of events) {
  //     if(item.type === 'follow') {
  //       const userId: string = item.source.userId;
  //       // 是否已簽名過
  //       let isSignature: any = await this.postchainSdkService.getSignatureList(userId, '', '', 25, 0, 1);
  //       if(isSignature.length) {
  //         // 更換選單
  //         await this.lineBotUserService.changeMenu2ShowFile(userId);
  //         continue
  //       }

  //       // 是否已簽到過
  //       let isSignIn: any = await this.postchainSdkService.getSignInList(userId, '', '', 25, 0, 1);
  //       if(isSignIn.length) {
  //         // 更換選單
  //         await this.lineBotUserService.changeMenu2Signature(userId);
  //       }
  //     }
  //   }
  // }


  async receive(@Body() body: WebhookRequestBody){
    const { events } = body;
    for(let item of events) {
      item = <MessageEvent>item;
      const { type, message } = item;
      if(type === 'message' && message.type === 'text' && message.text === '查詢簽到') {
        const { userId } = item.source;
        if(userId) {
          let res: any = await this.postchainSdkService.getSignInList(userId, '', '', 1, 0, 1);
          if(!res.length) {
            this.client.replyMessage(item.replyToken, {
              type: 'text',
              text: '尚未簽到'
            })
            continue
          }
          this.client.replyMessage(item.replyToken, {
            type: 'text',
            text: '簽到成功'
          });

        }
      }
    }
  }


}
