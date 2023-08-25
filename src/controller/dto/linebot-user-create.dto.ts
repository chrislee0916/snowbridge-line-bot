import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLinebotUserDto {
    @ApiProperty({
        required: true,
        description: 'line使用者id',
        example: 'Udheu4a65gd4yh'
    })
    @IsString()
    readonly userId: string;

    @ApiProperty({
        required: true,
        description: 'line使用者名稱',
        example: 'example'
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: true,
        description: 'line使用者電話',
        example: '0912345678'
    })
    @IsString()
    readonly phone: string;
}
