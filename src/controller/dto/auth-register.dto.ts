import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({
    required: true,
    description: '帳號',
    example: 'username@gmail.com',
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    required: true,
    description: '密碼',
    example: '12345678',
  })
  @IsString()
  readonly password: string;
}
