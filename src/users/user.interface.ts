export interface UserInterface {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly active: boolean;
    readonly hash?: string;
    password: string;
    salt: string;

    validatePassword(password: string): Promise<boolean>;
    fullName(): string;
    activate(): void;
}
