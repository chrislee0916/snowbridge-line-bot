import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DefaultResponsesDto {
  @ApiProperty({
    required: true,
    description: '執行狀態',
    example: true,
  })
  readonly success: boolean;
}

export class DefaultDataDto {
  @ApiProperty({
    description: '資料庫唯一 ID',
    example: '',
  })
  _id?: string;

  @ApiProperty({
    description: '是否刪除',
    example: false,
  })
  trashed?: boolean;

  @ApiProperty({
    description: '建立時間',
    example: 1652105082190,
  })
  createdAt?: number;

  @ApiProperty({
    description: '更新時間',
    example: 0,
  })
  updatedAt?: number;
}

export class DefaultDeleteDto {
  @ApiProperty({
    required: true,
    description: '刪除 id',
    example: ['62a98c08dae4339fc6e5c2e5', '62a98c08dae4339fc6e5c2e5'],
  })
  readonly ids: string[];
}

export class DefaultListResponsesDto {
  @ApiProperty({
    description: '總數',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: '數量',
    example: 25,
  })
  limit: number;

  @ApiProperty({
    description: '跳過數量',
    example: 0,
  })
  skip: number;

  @ApiProperty({
    description: '排序',
    example: -1 ,
  })
  sort: number;
}

export class DefaultListQueryDto {
  @ApiProperty({
    required: false,
    description: '數量',
    example: 25,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    required: false,
    description: '跳過數量',
    example: 0,
  })
  @IsNumber()
  skip: number;

  @ApiProperty({
    required: false,
    description: '排序',
    example: -1,
  })
  @IsNumber()
  sort: number;
}

export class DefaultDBList {
  @ApiProperty({
    description: '數量',
    example: 10,
  })
  limit?: number;

  @ApiProperty({
    description: '跳過數量',
    example: 20,
  })
  skip?: number;

  @ApiProperty({
    description: '排序',
    example: { field: 'asc', test: -1 },
  })
  sort?: any;
}
