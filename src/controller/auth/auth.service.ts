import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class AuthServiceLoginResponses {
  token: string;
  expiredAt: number;
}

@Injectable()
export class AuthService {
  Auth = {
    _id: '64e57ab042d618aeaecd71a4',
    email: 'username@gmail.com',
    password: '$2b$10$JrrMXZX/Lxnln2D/w0b7FOA2Eal0DPvQLCUkAP.HZJe9GX/9fTlzi'
  }
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  // Decoding the JWT Token
  // 解碼 JWT 令牌
  async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }

  // Validate User's password
  // 驗證用戶密碼
  isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }


  // 建立 Token
  // 使用 unix 秒的時間
  async generateToken(authId: string, expiredAt?: number): Promise<any> {
    const exp = expiredAt ? expiredAt : dayjs().add(10, 'd').unix();
    Logger.log(authId, ' authId ');
    Logger.log(exp, ' 過期時間 ');

    const Token = await this.jwtService.signAsync({
      exp,
      payload: { authId },
    });

    return { expiredAt: exp, token: Token };
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  // 驗證 JWT Token，如果 JWT Token 無效則拋出禁止錯誤
  async verify(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (err) {}
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthServiceLoginResponses> {
    console.log('================ auth login ====================');
    // const Auth = await this.DB.findOne({ email })
    //   .where('trashed')
    //   .equals(false);



    if (this.Auth.email !== email)
      throw new HttpException(
        this.configService.get('ERR_AUTH_LOGIN_NOT_REGISTER_USER'),
        HttpStatus.BAD_REQUEST,
      );

    const isPasswordValid = this.isPasswordValid(password, this.Auth.password);

    if (!isPasswordValid)
      throw new HttpException(
        this.configService.get('ERR_AUTH_LOGIN_PASSWORD_NOT'),
        HttpStatus.BAD_REQUEST,
      );

    return await this.generateToken(this.Auth._id);
  }

  async validate(token: string) {
    console.log('================= auth validate ===================');
    console.log('token ', token);
    const decoded: any = await this.verify(token);
    console.log('decoded ', decoded);

    if (!decoded || !decoded.payload)
      throw new HttpException(
        this.configService.get('ERR_AUTH_VALIDATE_BAD_ACCESS_TOKEN'),
        HttpStatus.BAD_REQUEST,
      );

    const authId: string = decoded.payload.authId;
    // const Auth = await this.ensureExist(authId);
    if(authId !== this.Auth._id) {
      throw new HttpException(
        this.configService.get('ERR_RESOURCE_NOT_FOUND'),
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('Auth ', this.Auth);

    return { authId, user: this.Auth };
  }
}
