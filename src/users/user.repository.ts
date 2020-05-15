import {EntityRepository, Repository} from 'typeorm';
import {ConflictException, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {User} from './user.entity';
import {plainToClass} from 'class-transformer';
import {RegisterUserDto} from './dto/register-user.dto';
import {LoginDto} from '../auth/dto/login.dto';
import {UserInterface} from './user.interface';
import {PasswordHasher} from './hasher/password-hasher';
import {PasswordHasherInterface} from './hasher/password-hasher.interface';
import {NullUser} from './null-user';
import {UpdateUserDto} from "./dto/update-user.dto";
import {UpdatePasswordDto} from "./dto/update-password.dto";
import * as crypto from 'crypto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor(
        private readonly passwordHasher: PasswordHasherInterface,
    ) {
        super();
        this.passwordHasher = new PasswordHasher();
    }

    async register(dto: RegisterUserDto): Promise<UserInterface> {
        const {email, password, firstName, lastName} = dto;
        const exists = await this.findOne({email});

        if (exists) {
            throw new ConflictException('User already exists. ');
        }

        const user = new User();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.hash = crypto.createHash('md5').update(Math.random().toString()).digest("hex");
        user.salt = await this.passwordHasher.generateSalt();
        user.password = await this.passwordHasher.hashPassword(password, user.salt);

        const saved = await user.save();

        return saved;
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<UserInterface> {
        const user = await this.ensureUserExists(id);
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        await user.save();

        return user;
    }

    async updatePassword(id: string, dto: UpdatePasswordDto): Promise<UserInterface> {
        const user = await this.ensureUserExists(id);
        user.salt = await this.passwordHasher.generateSalt();
        user.password = await this.passwordHasher.hashPassword(dto.password, user.salt);
        await user.save();

        return user;
    }

    async activate(hash: string): Promise<UserInterface> {
        const user = await this.findByHash(hash);
        user.activate();
        await user.save();

        return user;
    }

    async validateUserPassword(dto: LoginDto): Promise<UserInterface> {
        const {email, password} = dto;
        const user = await this.findOne({email, active: true}) || new NullUser();

        if (await user.validatePassword(password)) {
            return user;
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    async findByHash(hash: string): Promise<User> {
        const user = await this.findOne({hash});

        if (!user) {
            throw new NotFoundException('User does not exist. ');
        }

        return user;
    }

    private async ensureUserExists(id: string): Promise<User> {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User does not exist. ');
        }

        return user;
    }
}
