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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
let FilesService = class FilesService {
    constructor(fileModel, jwtService) {
        this.fileModel = fileModel;
        this.jwtService = jwtService;
    }
    async saveFile(file, token) {
        let payload;
        try {
            payload = await this.jwtService.decode(token);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Unable To Retrieve JWT Payload, ', e);
        }
        try {
            const processedFile = {
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
                data: file.buffer,
                owner: payload.user.id,
            };
            await new this.fileModel(processedFile).save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
        return { message: 'File Successfully Uploaded' };
    }
    async getFileList(token) {
        const { user } = await this.jwtService.decode(token);
        try {
            return await this.fileModel.find({ owner: user.id }, 'name').exec();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Error Occurred When Retrieving Data, ', e);
        }
    }
    async getFile(fileId, token) {
        let file;
        try {
            file = await this.fileModel.findOne({ _id: fileId }).exec();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Error Occurred When Retrieving Data, ', e);
        }
        if (!file) {
            throw new common_1.NotFoundException('File Does Not exist');
        }
        const { id: userId } = await this.jwtService.decode(token).user;
        if (file.owner !== userId) {
            throw new common_1.UnauthorizedException('Does Not Have Access to File');
        }
        return file;
    }
    async deleteFile(fileId, token) {
        await this.getFile(fileId, token);
        await this.fileModel.deleteOne({ _id: fileId }).exec();
        return { message: 'File Successfully Deleted' };
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('File')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], FilesService);
//# sourceMappingURL=files.service.js.map