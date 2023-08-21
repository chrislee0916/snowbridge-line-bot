import { ApiProperty } from '@nestjs/swagger';
import { DefaultListQueryDto } from './default.dto';

export class UserListDto extends DefaultListQueryDto {
  @ApiProperty({
    required: false,
    description: '使用者名稱',
    example: 'username',
  })
  username: string;
}
