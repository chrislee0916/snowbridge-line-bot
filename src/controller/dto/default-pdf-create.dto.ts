import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDefaultPdfDto {
    @ApiProperty({
        required: true,
        description: 'base64格式的檔案',
        example: 'data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4SuORXhpZgAASUkqAAgAAAAMAA8BAgAJAAAAngAAA'
    })
    @IsString()
    readonly file: string;
}