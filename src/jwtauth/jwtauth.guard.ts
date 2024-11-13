import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtauthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        // retrieves only the token part from the bearer string
        const authHeader = context.switchToHttp().getRequest().headers['authorization']

        console.log(authHeader)
        if (!authHeader) {
            throw new UnauthorizedException("Unauthorized");
        }
        const token = authHeader.split(" ")[1];

        console.log(token)
        try {
            await this.jwtService.verifyAsync(token)
        } catch (e) {
            throw new UnauthorizedException("Unauthorized");
        }

        return true;
    }
}
