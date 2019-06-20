import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {Request, Response} from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(protected userService: UserService,
              protected authService: AuthService) {}

  async use(req: Request, res: Response, next: Function) {
    if (!req.headers['authorization']) {
      return next();
    }
    const authToken = req.headers['authorization'];
    let decodedToken;
    try {
      decodedToken = await this.authService.verify(authToken);
    } catch (e) {
      throw new HttpException({
        error: 'Validation',
        message: `Validation error: ${e}`,
      },
        HttpStatus.FORBIDDEN,
        );
    }
    const user = await this.userService.findById(decodedToken.id);
    const tokenEntity = await this.authService.getToken(user._id);
    if (tokenEntity.token !== authToken) {
      throw new HttpException({
        error: 'Validation',
        message: 'Token does not match',
      },
        HttpStatus.FORBIDDEN,
        );
    }
    req['user'] = user;
    next();
  }
}
