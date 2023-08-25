import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { DefaultListQueryDto } from './default.dto';

export class LinebotUserListDto extends DefaultListQueryDto {
    @ApiProperty({
        required: false,
        description: 'line使用者id',
        example: 'Udheu4a65gd4yh'
    })
    @IsOptional()
    @IsString()
    readonly userId: string = '';

    @ApiProperty({
        required: false,
        description: 'line使用者名稱',
        example: 'example'
    })
    @IsOptional()
    @IsString()
    readonly name: string = '';

    @ApiProperty({
        required: false,
        description: 'line使用者電話',
        example: '0912345678'
    })
    @IsOptional()
    @IsString()
    readonly phone: string = '';
}
