import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { LinebotUserService } from './linebot-user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/controller/auth/guard/public.decorator';
import { CreateDefaultPdfDto } from 'src/controller/dto/default-pdf-create.dto';
import { LinebotUserCheckInListResponsesDto, LinebotUserListResponsesDto, LinebotUserSignatureListResponsesDto } from 'src/controller/dto/linebot-user-list_response.dto';
import { CreateLinebotUserDto } from 'src/controller/dto/linebot-user-create.dto';
import { LinebotUserListDto } from 'src/controller/dto/linebot-user-list.dto';
import { DefaultResponsesDto } from 'src/controller/dto/default.dto';
import { LinebotUserShowResponsesDto } from 'src/controller/dto/linebot-user-show_response.dto';

@ApiTags('linebot-user (使用者)')
@Controller('linebot-user')
export class LinebotUserController {
  constructor(private readonly linebotUserService: LinebotUserService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: '簽到',
    description: '使用userId跟name進行簽到'
  })
  @ApiCreatedResponse({
    type: LinebotUserShowResponsesDto,
  })
  checkIn(@Body() createLinebotUserDto: CreateLinebotUserDto) {
    return this.linebotUserService.checkIn(createLinebotUserDto)
  }

  @Public()
  @Post(':userId')
  @ApiOperation({
    summary: '上傳簽名文件',
    description: '使用param的userId跟base64編碼的file進行上傳'
  })
  @ApiCreatedResponse()
  signature(@Param('userId') userId: string, @Body() createDefaultPdfDto: CreateDefaultPdfDto): Promise<DefaultResponsesDto> {
    return this.linebotUserService.signature(userId, createDefaultPdfDto)
  }

  @Get('all-list')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '簽到的列表',
    description: ''
  })
  @ApiOkResponse({
    type: LinebotUserCheckInListResponsesDto
  })
  findAllCheckIn(@Query() query: LinebotUserListDto) {
    return this.linebotUserService.findAllCheckIn(query);
  }

  @Get('signature-list')
  // @ApiBearerAuth()
  @ApiOperation({
    summary: '簽名的列表',
    description: ''
  })
  @ApiOkResponse({
    type: LinebotUserSignatureListResponsesDto
  })
  findAllSignature(@Query() query: LinebotUserListDto) {
    return this.linebotUserService.findAllSignature(query);
  }
}
