export interface UserInterface {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    password: string;
    salt: string;

    validatePassword(password: string): Promise<boolean>;
}
