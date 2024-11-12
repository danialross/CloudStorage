import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from "bcrypt"
import {UsersService} from "../users/users.service";
import {UserDto} from "../dtos/userDto";
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validatePassword(loginPassword: string, userPassword: string): Promise<boolean> {

        try {
            return await bcrypt.compare(loginPassword, userPassword);
        } catch (err) {
            throw new InternalServerErrorException("Unexpected Error Occurred With Bcrypt : ", err);
        }

    }

    async login(loginDetails: UserDto): Promise<string> {
        const user = await this.userService.findUser(loginDetails)

        if (!user) {
            throw new UnauthorizedException("User Not Found");
        }

        const isValid = await this.validatePassword(loginDetails.password, user.password);

        if (!isValid) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        try {
            const payload = {payload: loginDetails.name, sub: user._id}
            return await this.jwtService.signAsync(payload)
        } catch (e) {
            throw new InternalServerErrorException("Unexpected Error Occurred With JWT : ", e)
        }
    }
}
