import { ApiProperty } from '@nestjs/swagger';

export class AppCreateDto {
  @ApiProperty({
    description: '內容',
    example: 'test',
  })
  readonly text: string;
}
