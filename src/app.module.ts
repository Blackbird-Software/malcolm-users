import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {HealthModule} from './health/health.module';
import {DatabaseOrmModule} from './database-orm.module';

@Module({
    imports: [
        DatabaseOrmModule(),
        AuthModule,
        UsersModule,
        HealthModule,
    ],
})

export class AppModule {
}
