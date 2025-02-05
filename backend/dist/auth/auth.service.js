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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validatePassword(loginPassword, userPassword) {
        try {
            return await bcrypt.compare(loginPassword, userPassword);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Unexpected Error Occurred With Bcrypt : ', e);
        }
    }
    async login(loginDetails) {
        const user = await this.userService.findUser(loginDetails);
        if (!user) {
            throw new common_1.UnauthorizedException('User Not Found');
        }
        const isValid = await this.validatePassword(loginDetails.password, user.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        try {
            const payload = {
                user: { name: loginDetails.name, id: user._id },
                sub: user._id,
            };
            return await this.jwtService.signAsync(payload);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Unexpected Error Occurred With JWT : ', e);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map