"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_validation_guard_1 = require("../guards/jwt-validation.guard");
const mongoose_1 = require("@nestjs/mongoose");
const file_schema_1 = require("../schemas/file.schema");
const users_module_1 = require("../users/users.module");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: file_schema_1.File.name, schema: file_schema_1.FileSchema }]),
            users_module_1.UsersModule,
        ],
        providers: [files_service_1.FilesService, jwt_validation_guard_1.JwtValidationGuard],
        controllers: [files_controller_1.FilesController],
        exports: [files_service_1.FilesService],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map