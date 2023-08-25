import { ApiProperty } from "@nestjs/swagger";
import { DefaultDataDto, DefaultListResponsesDto } from "./default.dto";


export class LinebotUserShowResponsesDto extends DefaultDataDto {
    @ApiProperty({
        required: true,
        description: 'line使用者id',
        example: 'Udheu4a65gd4yh'
    })
    readonly userId: string;

    @ApiProperty({
        required: true,
        description: 'line使用者名稱',
        example: 'example'
    })
    readonly name: string;

    @ApiProperty({
        required: true,
        description: 'line使用者電話',
        example: '0912345678'
    })
    readonly phone: string;
}


export class LinebotUserCheckInShowResponsesDto extends DefaultDataDto {
    @ApiProperty({
        required: true,
        description: 'line使用者id',
        example: 'Udheu4a65gd4yh'
    })
    readonly userId: string;

    @ApiProperty({
        required: true,
        description: 'line使用者名稱',
        example: 'example'
    })
    readonly name: string;

    @ApiProperty({
        required: true,
        description: 'line使用者電話',
        example: '0912345678'
    })
    readonly phone: string;


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

export class LinebotUserSignatureShowResponsesDto extends DefaultDataDto {
    @ApiProperty({
        required: true,
        description: 'line使用者id',
        example: 'Udheu4a65gd4yh'
    })
    readonly userId: string;

    @ApiProperty({
        required: true,
        description: 'base64編碼的檔案',
        example: 'data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4SuORXhpZgAASUkqAAgAAAAMAA8BAgAJAAAAngAAA'
    })
    readonly pdfContent: string;


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



