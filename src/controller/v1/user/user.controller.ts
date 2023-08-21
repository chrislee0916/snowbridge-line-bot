import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserShowResponsesDto } from 'src/controller/dto/user-show_responses';
import { UserListDto } from 'src/controller/dto/user-list.dto';
import { UserListResponsesDto } from 'src/controller/dto/user-list_responses.dto';

@ApiTags('user (使用者)')
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '列表', // 標題
    description: '', // 描述
    operationId: '', // id
    // deprecated: true, // 註銷
  })
  @ApiOkResponse({
    type: UserListResponsesDto,
  })
  async list(@Query() query: UserListDto): Promise<UserListResponsesDto> {
    const items = await this.userService.list(query);
    const total = await this.userService.count(query);

    const doc = {
      limit: query.limit,
      skip: query.skip,
      sort: query.sort,
      total,
      items,
    };
    return doc;
  }

  @Get(':userId')
  @ApiOperation({
    summary: '詳細資料', // 標題
    description: '', // 描述
    operationId: '', // id
    // deprecated: true, // 註銷
  })
  @ApiOkResponse({
    type: UserShowResponsesDto,
  })
  async show(@Param('userId') userId: string): Promise<UserShowResponsesDto> {
    return await this.userService.ensureExist(userId);
  }
}
