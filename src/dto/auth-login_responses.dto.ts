import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponsesDto {
  @ApiProperty({
    required: true,
    description: 'Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  access_token: string;

  @ApiProperty({
    required: true,
    description: '到期時間',
    example: 132312132,
  })
  expiredAt: number;
}
