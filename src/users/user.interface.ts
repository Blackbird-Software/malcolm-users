import {RoleEnum} from "./enum/role.enum";

export interface UserInterface {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly active: boolean;
    readonly hash?: string;
    password: string;
    salt: string;
    roles: RoleEnum[];

    validatePassword(password: string): Promise<boolean>;
    fullName(): string;
    activate(): void;
    isAdmin(): boolean;
    hasRoles(roles: string[]): boolean;
}
