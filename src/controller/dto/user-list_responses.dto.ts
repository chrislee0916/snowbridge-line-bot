import { ApiProperty } from '@nestjs/swagger';
import { DefaultListResponsesDto } from './default.dto';
import { UserShowResponsesDto } from './user-show_responses';

// class User_List_items extends Default_data_Dto {
//   @ApiProperty({
//     description: '使用者名稱',
//     example: 'jos',
//   })
//   username: string;
// }

export class UserListResponsesDto extends DefaultListResponsesDto {
  @ApiProperty({
    description: '資料',
    type: [UserShowResponsesDto],
  })
  items: UserShowResponsesDto[];
}
