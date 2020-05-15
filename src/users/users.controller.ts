import {
    Controller,
    Post,
    Body,
    Get, Param, ParseUUIDPipe, Put, Patch,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UsersService} from './users.service';
import {RegisterUserDto} from './dto/register-user.dto';
import {UserInterface} from "./user.interface";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UpdatePasswordDto} from "./dto/update-password.dto";
import {HashValidationPipe} from "./pipe/hash-validation.pipe";

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Post()
    async register(@Body() dto: RegisterUserDto): Promise<UserInterface> {
        return await this.usersService.register(dto);
    }

    @Put('/:id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<UserInterface> {
        return this.usersService.update(id, dto);
    }

    @Patch('/:id')
    updatePassword(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdatePasswordDto,
    ): Promise<UserInterface> {
        return this.usersService.updatePassword(id, dto);
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<UserInterface> {
        return await this.usersService.findById(id);
    }

    @Get(':hash/activate')
    async activate(@Param('hash', HashValidationPipe) hash: string): Promise<UserInterface> {
        return await this.usersService.activate(hash);
    }
}