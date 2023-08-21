import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { DefaultResponsesDto } from '../dto/default.dto';
import { Public } from './guard/public.decorator';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/controller/dto/auth-login.dto';
import { AuthLoginResponsesDto } from 'src/controller/dto/auth-login_responses.dto';
import { UserService } from '../v1/user/user.service';

@Public()
@ApiTags('auth (驗證)')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: '註冊', // 標題
    description: '使用帳號密碼進行註冊', // 描述
    operationId: '', // id
    // deprecated: true, // 註銷
  })
  @ApiOkResponse({
    type: DefaultResponsesDto,
  })
  async register(@Body() body: AuthRegisterDto): Promise<DefaultResponsesDto> {
    const { email, password } = body;
    const Auth = await this.authService.register({ email, password });

    const User = await this.userService.create({ username: email });
    console.log('User ', User);

    Auth.set('user', User._id);
    await Auth.save();

    return { success: true };
  }

  @Post('login')
  @ApiOperation({
    summary: '登入', // 標題
    description: '使用帳號密碼進行登入', // 描述
    operationId: '', // id
    // deprecated: true, // 註銷
  })
  @ApiOkResponse({
    type: AuthLoginResponsesDto,
  })
  async login(@Body() body: AuthLoginDto): Promise<AuthLoginResponsesDto> {
    const Login = await this.authService.login(body);
    return { access_token: Login.token, expiredAt: Login.expiredAt };
  }
}
