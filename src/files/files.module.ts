import {Module} from '@nestjs/common';
import {FilesService} from './files.service';
import {FilesController} from './files.controller';
import {JwtModule} from "@nestjs/jwt";
import {JwtauthGuard} from "../jwtauth/jwtauth.guard";
import {MongooseModule} from "@nestjs/mongoose";
import {FileSchema, File} from "../schemas/files.schema";

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET, signOptions: {expiresIn: "1h"},
    }), MongooseModule.forFeature([{name: File.name, schema: FileSchema}])],
    providers: [FilesService, JwtauthGuard],
    controllers: [FilesController]
})
export class FilesModule {
}
