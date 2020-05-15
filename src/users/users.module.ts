import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../auth/auth.module';
import {UserRepository} from './user.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {LogsModule} from "../logs/logs.module";
import {MailModule} from "../mail/mail.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        AuthModule,
        LogsModule,
        MailModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {
}
