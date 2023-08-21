import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppCreateDto } from './dto/app-create';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('測試 api')
@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOperation({
    summary: '建立', // 標題
    description: '', // 描述
    operationId: '', // id
    // deprecated: true, // 註銷
  })
  @ApiCreatedResponse({
    type: AppCreateDto,
  })
  create(@Body() body: AppCreateDto): AppCreateDto {
    console.log('body : ', body);
    return body;
  }

  @Get()
  @ApiOperation({
    summary: '列表', // 標題
    description: '', // 描述
    operationId: '', // id
    // deprecated: true, // 註銷
  })
  list(@Query() query: any): any {
    console.log('query : ', query);
    return query;
  }

  @Get(':key')
  @ApiOperation({
    summary: '詳細資料', // 標題
    description: '', // 描述
    operationId: '', // id
    // deprecated: true, // 註銷
  })
  show(@Param('key') key: string): string {
    console.log('key : ', key);
    return key;
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
