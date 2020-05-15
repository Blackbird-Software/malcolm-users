import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
