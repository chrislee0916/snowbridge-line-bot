import { Controller, Post, Body } from '@nestjs/common';
import { LinebotWebhookService } from './linebot-webhook.service';
import { Public } from 'src/controller/auth/guard/public.decorator';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('linebot-webhook')
export class LinebotWebhookController {
  constructor(private readonly linebotWebhookService: LinebotWebhookService) {}

  @Post()
  @Public()
  create(@Body() body: WebhookRequestBody) {
    return this.linebotWebhookService.create(body);
  }

}
