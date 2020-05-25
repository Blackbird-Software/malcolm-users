import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    HttpCode, UseGuards, Get, Patch, Put, Head,
} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {UserInterface} from '../users/user.interface';
import {GetUser} from './decorator/get-user.decorator';
import {JwtResponseInterface} from './jwt/jwt-response.interface';
import {UpdatePasswordDto} from '../users/dto/update-password.dto';
import {UsersService} from '../users/users.service';
import {User} from '../users/user.entity';
import {UpdateUserDto} from '../users/dto/update-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {
    }

    @ApiBearerAuth()
    @Head('/check')
    @UseGuards(AuthGuard())
    @HttpCode(204)
    check(): void {
    }

    @Post('/token')
    @HttpCode(200)
    login(@Body(ValidationPipe) dto: LoginDto): Promise<JwtResponseInterface> {
        return this.authService.login(dto);
    }

    @ApiBearerAuth()
    @Get('/me')
    @UseGuards(AuthGuard())
    me(@GetUser() currentUser: UserInterface): UserInterface {
        return currentUser;
    }

    @ApiBearerAuth()
    @Patch('/me')
    @UseGuards(AuthGuard())
    updatePassword(
        @Body() dto: UpdatePasswordDto,
        @GetUser() currentUser: User,
    ): Promise<UserInterface> {
        return this.usersService.updatePassword(currentUser, dto);
    }

    @ApiBearerAuth()
    @Put('/me')
    @UseGuards(AuthGuard())
    updateMe(
        @Body() dto: UpdateUserDto,
        @GetUser() currentUser: User,
    ): Promise<UserInterface> {
        return this.usersService.update(currentUser.id, dto);
    }
}
