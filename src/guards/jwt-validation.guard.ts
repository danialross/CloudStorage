import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // retrieves only the token part from the bearer string
    const authHeader = context.switchToHttp().getRequest().headers[
      'authorization'
    ];

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized');
    }
    const token = authHeader.split(' ')[1];

    try {
      await this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
