import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';

import {RegisterUserDto} from './dto/register-user.dto';
import {UserInterface} from './user.interface';
import {UpdateUserDto} from "./dto/update-user.dto";
import {UpdatePasswordDto} from "./dto/update-password.dto";
import {LogsService} from "../logs/logs.service";
import {ActionType} from "../logs/enum/action-types";
import {User} from "./user.entity";

@Injectable()
export class UsersService {

    private CLASSNAME = 'USER';

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly logsService: LogsService
    ) {
        this.logsService.setClassName(this.CLASSNAME);
    }

    async register(dto: RegisterUserDto): Promise<UserInterface> {
        const user = await this.userRepository.register(dto);
        const clearedUser = this.removeSensitiveData(user);
        await this.logsService.sendMessage(clearedUser, ActionType.CREATE);

        return user;
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserInterface> {
        const user = await this.userRepository.updateUser(id, dto);
        const clearedUser = this.removeSensitiveData(user);
        await this.logsService.sendMessage(clearedUser, ActionType.UPDATE);

        return user;
    }

    async updatePassword(id: string, dto: UpdatePasswordDto): Promise<UserInterface> {
        const user = await this.userRepository.updatePassword(id, dto);
        const clearedUser = this.removeSensitiveData(user);
        await this.logsService.sendMessage(clearedUser, ActionType.UPDATE);

        return user;
    }

    async findById(id: string): Promise<UserInterface> {
        const found = await this.userRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('User not found. ');
        }

        return found;
    }

    private removeSensitiveData(user: UserInterface): Partial<UserInterface> {
        delete user.password;
        delete user.salt;

        return {...user};
    }
}
