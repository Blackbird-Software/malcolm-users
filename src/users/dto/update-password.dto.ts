import {IsString, MinLength, IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdatePasswordDto {
    @ApiProperty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}
