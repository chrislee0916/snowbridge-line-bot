import { ApiProperty } from '@nestjs/swagger';

export class Default_responses_Dto {
  @ApiProperty({
    required: true,
    description: '執行狀態',
    example: true,
  })
  readonly success: boolean;
}

export class Default_data_Dto {
  @ApiProperty({
    description: '資料庫唯一 ID',
    example: '62791f7a9704f94c81211b51',
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
    example: 1652105082190,
  })
  updatedAt?: number;
}

export class Default_delete_Dto {
  @ApiProperty({
    required: true,
    description: '刪除 id',
    example: ['62a98c08dae4339fc6e5c2e5', '62a98c08dae4339fc6e5c2e5'],
  })
  readonly ids: string[];
}

export class Default_list_responses_Dto {
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
    example: { createdAt: -1 },
  })
  sort: string;
}

export class Default_list_query_Dto {
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
    example: { createdAt: -1 },
  })
  sort: string;
}

export class Default_DB_list {
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
