import { ApiProperty } from "@nestjs/swagger";
import { DefaultDataDto, DefaultListResponsesDto } from "./default.dto";
import { LinebotUserCheckInShowResponsesDto, LinebotUserShowResponsesDto, LinebotUserSignatureShowResponsesDto } from "./linebot-user-show_response.dto";




export class LinebotUserListResponsesDto extends DefaultListResponsesDto {
    @ApiProperty({
      description: '資料',
      type: [LinebotUserShowResponsesDto],
    })
    items: LinebotUserShowResponsesDto[];
  }

// 簽到列表
export class LinebotUserCheckInListResponsesDto extends DefaultListResponsesDto {
    @ApiProperty({
      description: '資料',
      type: [LinebotUserCheckInShowResponsesDto],
    })
    items: LinebotUserCheckInShowResponsesDto[];
  }

// 簽名列表
export class LinebotUserSignatureListResponsesDto extends DefaultListResponsesDto {
    @ApiProperty({
      description: '資料',
      type: [LinebotUserSignatureShowResponsesDto],
    })
    items: LinebotUserSignatureShowResponsesDto[];
  }

