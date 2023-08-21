import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { DatabaseService } from '../../database/database.service';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../v1/user/user.service';

export class AuthServiceLoginResponses {
  token: string;
  expiredAt: number;
}

@Injectable()
export class AuthService extends DatabaseService {
  constructor(
    @InjectModel(Auth.name) private DB: Model<AuthDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super(DB);
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

  // Encode User's password
  // 編碼用戶密碼
  encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    console.log('salt ', salt);

    return bcrypt.hashSync(password, 10);
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

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthDocument> {
    console.log('================ auth register ====================');
    console.log('email ', email);

    const authFindOne = await this.DB.findOne({ email })
      .where('trashed')
      .equals(false);

    if (authFindOne != null)
      throw new HttpException(
        this.configService.get('ERR_AUTH_REGISTER_USER_EXIST'),
        HttpStatus.BAD_REQUEST,
      );

    const authObj = {
      email,
      password: this.encodePassword(password),
    };

    const Auth = await this.DB.create(authObj);
    console.log('Auth ', Auth);

    console.log('====================================');
    return Auth;
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthServiceLoginResponses> {
    console.log('================ auth login ====================');
    const Auth = await this.DB.findOne({ email })
      .where('trashed')
      .equals(false);

    if (!Auth)
      throw new HttpException(
        this.configService.get('ERR_AUTH_LOGIN_NOT_REGISTER_USER'),
        HttpStatus.BAD_REQUEST,
      );

    const isPasswordValid = this.isPasswordValid(password, Auth.password);

    if (!isPasswordValid)
      throw new HttpException(
        this.configService.get('ERR_AUTH_LOGIN_PASSWORD_NOT'),
        HttpStatus.BAD_REQUEST,
      );

    return await this.generateToken(Auth._id);
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
    const Auth = await this.ensureExist(authId);
    console.log('Auth ', Auth);

    const User = await this.userService.ensureExist(Auth.user);
    console.log('User ', User);

    return { authId: Auth._id.toString(), user: User };
  }
}
