import { ApiProperty } from '@nestjs/swagger';
import { DefaultDataDto } from './default.dto';

export class DefaultPdfShowResponsesDto extends DefaultDataDto {
    @ApiProperty({
        required: true,
        description: 'base64格式的檔案',
        example: 'data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4SuORXhpZgAASUkqAAgAAAAMAA8BAgAJAAAAngAAA'
    })
    readonly file: string;

    @ApiProperty({
        required: true,
        description: '區塊鏈高度',
        example: '123'
    })
    readonly blockHeight: number;

    @ApiProperty({
        required: true,
        description: '交易id',
        example: '21dsf213fds'
    })
    readonly txId: string;
}
