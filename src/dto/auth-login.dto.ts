import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    required: true,
    description: '信箱',
    example: 'username@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    required: true,
    description: '密碼',
    example: '12345678',
  })
  readonly password: string;
}
