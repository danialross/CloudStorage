"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const jwt_validation_guard_1 = require("../guards/jwt-validation.guard");
const platform_express_1 = require("@nestjs/platform-express");
let FilesController = class FilesController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async upload(file, authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            return await this.fileService.saveFile(file, token);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Unable To Save File ,', e.message);
        }
    }
    async getFiles(authHeader) {
        const token = authHeader.split(' ')[1];
        return await this.fileService.getFileList(token);
    }
    async getFile(authHeader, fileId, res) {
        const token = authHeader.split(' ')[1];
        const file = await this.fileService.getFile(fileId, token);
        res.setHeader('Content-Type', file.type);
        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        res.send(file.data);
    }
    async deleteFile(fileId, authHeader) {
        const token = authHeader.split(' ')[1];
        return await this.fileService.deleteFile(fileId, token);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_validation_guard_1.JwtValidationGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { limits: { fileSize: 16 * 1024 * 1024 } })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_validation_guard_1.JwtValidationGuard),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFiles", null);
__decorate([
    (0, common_1.Get)(':fileId'),
    (0, common_1.UseGuards)(jwt_validation_guard_1.JwtValidationGuard),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('fileId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFile", null);
__decorate([
    (0, common_1.Delete)(':fileId'),
    (0, common_1.UseGuards)(jwt_validation_guard_1.JwtValidationGuard),
    __param(0, (0, common_1.Param)('fileId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deleteFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map