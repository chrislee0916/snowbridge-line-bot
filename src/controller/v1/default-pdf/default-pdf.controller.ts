import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefaultPdfService } from './default-pdf.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDefaultPdfDto } from 'src/controller/dto/default-pdf-create.dto';
import { DefaultPdfShowResponsesDto } from 'src/controller/dto/default-pdf-show_responses';
import { DefaultResponsesDto } from 'src/controller/dto/default.dto';
import { Public } from 'src/controller/auth/guard/public.decorator';
import { PostchainSdkService } from '../postchain-sdk/postchain-sdk.service';

@ApiTags('default-pdf (預設檔案)')
@Controller('default-pdf')
export class DefaultPdfController {
  constructor(
    private readonly defaultPdfService: DefaultPdfService,

    ) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '上傳預設檔案',
    description: ''
  })
  @ApiCreatedResponse({
    type: DefaultResponsesDto
  })
  create(@Body() createDefaultPdfDto: CreateDefaultPdfDto){
    return this.defaultPdfService.create(createDefaultPdfDto)
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: '取得預設檔案',
    description: ''
  })
  @ApiOkResponse({
    type: DefaultPdfShowResponsesDto
  })
  findAll() {
    return this.defaultPdfService.findAll()
  }

}
