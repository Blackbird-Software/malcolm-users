import {
    Controller,
    Post,
    Body,
    Get, Param, ParseUUIDPipe, Put, Res,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UsersService} from './users.service';
import {RegisterUserDto} from './dto/register-user.dto';
import {UserInterface} from "./user.interface";
import {UpdateUserDto} from "./dto/update-user.dto";
import {HashValidationPipe} from "./pipe/hash-validation.pipe";
import {Response} from 'express';

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

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<UserInterface> {
        return await this.usersService.findById(id);
    }

    @Get(':hash/activate')
    async activate(
        @Param('hash', HashValidationPipe) hash: string,
        @Res() res: Response
    ): Promise<any> {
        const user = await this.usersService.activate(hash);

        return res.render(
            'user/account-activated',
            {fullName: user.fullName()},
        );
    }
}