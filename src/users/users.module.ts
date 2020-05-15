import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../auth/auth.module';
import {UserRepository} from './user.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {LogsModule} from "../logs/logs.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        AuthModule,
        LogsModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {
}
