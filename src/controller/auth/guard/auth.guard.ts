import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly service: AuthService;

  constructor(private reflector: Reflector) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const contextType: string = ctx.getType();
    const req =
      contextType == 'ws'
        ? ctx.switchToWs().getClient().handshake
        : ctx.switchToHttp().getRequest();

    const headers = req.headers;
    const authorization: string = headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');
    if (!!authorization.indexOf('Bearer ') || !bearer || bearer.length < 2)
      throw new UnauthorizedException();

    const token: string = bearer[1];
    const TokenValidate = await this.service.validate(token);
    console.debug('TokenValidate', TokenValidate);

    return true;
  }
}
