import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LinebotWebhookService } from './linebot-webhook.service';
import { Public } from 'src/controller/auth/guard/public.decorator';
import { WebhookRequestBody } from '@line/bot-sdk';
import { SignatureValidateGuard } from './guard/signature-validate.guard';

@Controller('linebot-webhook')
@UseGuards(SignatureValidateGuard)
export class LinebotWebhookController {
  constructor(private readonly linebotWebhookService: LinebotWebhookService) {}

  @Post()
  @Public()
  receive(@Body() body: WebhookRequestBody) {
    return this.linebotWebhookService.receive(body);
  }
}
