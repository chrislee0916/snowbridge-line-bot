import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppCreateDto } from './dto/app-create';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() body: AppCreateDto): AppCreateDto {
    console.log('body : ', body);
    return body;
  }

  @Get()
  list(@Query() query: any): any {
    console.log('query : ', query);
    return query;
  }

  @Get(':key')
  show(@Param('key') key: string): string {
    console.log('key : ', key);
    return key;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
