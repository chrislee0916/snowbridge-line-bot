import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignatureValidateGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const channelSecret = this.configService.get('LINEBOT_CHANNEL_SECRET');
    const request = context.switchToHttp().getRequest<Request>();
    const signature = crypto
      .createHmac('SHA256', channelSecret)
      .update(JSON.stringify(request.body))
      .digest('base64');
    return signature === request.get('x-line-signature');;
  }
}
