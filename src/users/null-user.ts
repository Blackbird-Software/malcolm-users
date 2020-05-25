import {UserInterface} from './user.interface';
import {RoleEnum} from "./enum/role.enum";

export class NullUser implements UserInterface {

    readonly email: string;
    readonly firstName: string;
    readonly id: string;
    readonly lastName: string;
    readonly active: boolean;
    readonly hash?: string;
    readonly password: string;
    readonly salt: string;
    readonly roles: RoleEnum[];

    validatePassword(password: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    fullName(): string {
        return '';
    }

    activate(): void {
    }

    isAdmin(): boolean {
        return false;
    }

    hasRoles(roles: string[]): boolean {
        return false;
    }
}
