import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, Index,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Exclude} from 'class-transformer';
import {UserInterface} from './user.interface';
import {RoleEnum} from "./enum/role.enum";

@Entity('users')
export class User extends BaseEntity implements UserInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({unique: true})
    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column({nullable: true})
    hash?: string;

    @Exclude()
    @Column({default: false})
    active: boolean = false;

    @Exclude()
    @Column()
    salt: string;

    @Exclude()
    @Column({type: 'enum', enum: RoleEnum, array: true, default: [RoleEnum.USER]})
    roles: RoleEnum[] = [
        RoleEnum.USER
    ];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude()
    fullName = () => `${this.firstName} ${this.lastName}`

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);


        return hash === this.password;
    }

    activate(): void {
        this.hash = null;
        this.active = true;
    }

    isAdmin(): boolean {
        return this.roles.includes(RoleEnum.ADMIN);
    }

    hasRoles(roles: string[]): boolean {
        return this.roles.some(role => roles.includes(role));
    }
}
