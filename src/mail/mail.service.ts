import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {UserInterface} from '../users/user.interface';
import config from 'config';

const server = config.server;

@Injectable()
export class MailService {

    private readonly baseUrl: string;

    constructor(
        private readonly mailerService: MailerService,
    ) {
        this.baseUrl = server.baseUrl;
    }

    async registerMail(user: UserInterface): Promise<any> {
        await this.mailerService
            .sendMail({
                to: user.email,
                subject: 'Activate your account',
                template: 'register',
                context: {
                    fullName: user.fullName(),
                    link: `${this.baseUrl}/users/${user.hash}/activate`,
                },
            });
    }

    async resetPassword(user: UserInterface): Promise<any> {
        await this.mailerService
            .sendMail({
                to: user.email,
                subject: 'Reset your password',
                template: 'reset-password',
                context: {
                    link: `${this.baseUrl}/users/${user.hash}/reset`,
                },
            });
    }
}
