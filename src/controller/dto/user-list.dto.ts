import { ApiProperty } from '@nestjs/swagger';
import { DefaultListQueryDto } from './default.dto';
import { IsOptional, IsString } from 'class-validator';

export class UserListDto extends DefaultListQueryDto {
  @ApiProperty({
    required: false,
    description: '使用者名稱',
    example: 'username',
  })
  @IsOptional()
  @IsString()
  username: string;
}
