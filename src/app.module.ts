import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		UsersModule,
		FilesModule,
		AuthModule,
		MongooseModule.forRoot(process.env.MONGOURI),
	],
})
export class AppModule {}
