import {Module} from '@nestjs/common';
import {FilesService} from './files.service';
import {FilesController} from './files.controller';
import {JwtModule} from "@nestjs/jwt";
import {JwtValidationGuard} from "../guards/jwt-validation.guard";
import {MongooseModule} from "@nestjs/mongoose";
import {FileSchema, File} from "../schemas/file.schema";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        JwtModule.register({secret: process.env.JWT_SECRET, signOptions: {expiresIn: "1h"}}),
        MongooseModule.forFeature([{name: File.name, schema: FileSchema}]),
        UsersModule
    ],
    providers: [FilesService, JwtValidationGuard],
    controllers: [FilesController],
    exports: [FilesService]
})
export class FilesModule {
}
