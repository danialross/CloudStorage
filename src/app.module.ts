import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import { FilesModule } from './files/files.module';

@Module({
    imports: [UsersModule, AuthModule, MongooseModule.forRoot(process.env.MONGOURI
    ), FilesModule],
    providers: [AppService],
})
export class AppModule {
}
