import { ApiProperty } from '@nestjs/swagger';
import { DefaultDataDto } from './default.dto';

export class UserShowResponsesDto extends DefaultDataDto {
  @ApiProperty({
    required: true,
    description: '使用者名稱',
    example: 'username',
  })
  username: string;
}
