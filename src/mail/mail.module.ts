import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {MailService} from './mail.service';
import config from 'config';

const server = config.server;

@Module({
    imports: [
        MailerModule.forRoot({
            transport: process.env.SMTP_DSN || server.smtpDsn,
            defaults: {
                from: '"Malcolm support" <support@malcolm.com>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})

export class MailModule {
}
