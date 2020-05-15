import {UserInterface} from './user.interface';

export class NullUser implements UserInterface {

    readonly email: string;
    readonly firstName: string;
    readonly id: string;
    readonly lastName: string;
    readonly active: boolean;
    readonly hash?: string;
    readonly password: string;
    readonly salt: string;

    validatePassword(password: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    fullName(): string {
        return '';
    }

    activate(): void {
    }
}
