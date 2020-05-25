import {
    Controller,
    Post,
    Body,
    Get, Param, ParseUUIDPipe, Put, Res, HttpCode, UseGuards,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {UsersService} from './users.service';
import {RegisterUserDto} from './dto/register-user.dto';
import {UserInterface} from './user.interface';
import {UpdateUserDto} from './dto/update-user.dto';
import {HashValidationPipe} from './pipe/hash-validation.pipe';
import {Response} from 'express';
import {ResetPasswordDto} from './dto/reset-password.dto';
import {UpdatePasswordDto} from './dto/update-password.dto';
import {HasRoles} from "../auth/decorator/has-roles.decorator";
import {AuthGuard} from "@nestjs/passport";
import {RoleAuthGuard} from "../auth/jwt/role.guard";

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

    @Post('/:reset-password')
    @HttpCode(204)
    async generateResetPassword(@Body() dto: ResetPasswordDto): Promise<any> {
        await this.usersService.resetPassword(dto);
    }

    @Put('/:id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<UserInterface> {
        return this.usersService.update(id, dto);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
    @HasRoles('admin')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<UserInterface> {
        return await this.usersService.findById(id);
    }

    @Post(':hash/activate')
    async activate(
        @Param('hash', HashValidationPipe) hash: string,
        @Res() response: Response,
    ): Promise<any> {
        const user = await this.usersService.activate(hash);

        return response.render(
            'user/account-activation',
            {
                fullName: user.fullName(),
            },
        );
    }

    @Post(':hash/reset-password')
    @HttpCode(204)
    async resetPassword(
        @Param('hash', HashValidationPipe) hash: string,
        @Body() dto: UpdatePasswordDto,
        @Res() response: Response,
    ): Promise<any> {
        const user = await this.usersService.findByHash(hash);
        await this.usersService.updatePassword(user, dto);
    }
}
