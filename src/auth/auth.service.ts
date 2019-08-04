import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../user/interfaces/user.interface';
import { TOKEN_TOKEN } from '../_common/constants';
import { Model } from 'mongoose';
import { UserModelDto } from '../user/dto/user-model.dto';
import { AppLogger } from '../app.logger';
import { TokenInterface, TokenInterface as TokenEntity } from './interfaces/token.interface';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  private logger = new AppLogger(AuthService.name);

  constructor(@Inject(TOKEN_TOKEN) private readonly tokenModel: Model<TokenEntity>,
              private readonly jwtService: JwtService,
              private readonly userService: UserService,
  ) {}

  async signIn(user: UserInterface): Promise<TokenEntity> {
    const authToken = this.jwtService.sign({id: user._id});
    const tokenEntity: TokenInterface = await this.getToken(user._id);
    if (tokenEntity) {
      this.logger.log(`[sigIn] Update token for user with id: ${user._id}`);
      return await this.tokenModel.findOneAndUpdate({_id: tokenEntity._id}, {token: authToken}).catch(error => {
        this.logger.log(`[sigIn] Update token failed: ${JSON.stringify(error)}`);
        throw new HttpException({
          error: 'Token',
          message: `Failed to update with error: ${error}`,
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      });
    }
    this.logger.log(`[sigIn] Create token for user with id: ${user._id}`);
    return await this.tokenModel.create({userId: user._id, token: authToken}).catch(error => {
      this.logger.log(`[sigIn] Create token failed: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'Token',
        message: `Failed to create with error: ${error}`,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }

  async login(credentials: CredentialsDto): Promise<UserInterface> {
    this.logger.log(`[login] Login user with email: ${credentials.email}`);
    const user: UserInterface = await this.userService.findByEmail(credentials.email);
    if (!user) {
      this.logger.log(`[login] Login user failed with email: ${credentials.email}`);
      throw new HttpException({
        error: 'Login',
        message: 'User not found',
      }, HttpStatus.NOT_FOUND);
    }
    if (credentials.password === user.password) {
      return user;
    }
    throw new HttpException({
      message: 'Incorrect credentials',
    }, HttpStatus.NOT_FOUND);
  }

  public async getToken(id: string): Promise<TokenEntity> {
    this.logger.log(`[getToken] Get token for user with id: ${id}`);
    return await this.tokenModel.findOne({userId: id}).catch(error => {
      this.logger.log(`[getToken] Get token failed: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'Token',
        message: `Failed to find by userId: ${id}, with error: ${error}`,
      }, HttpStatus.NOT_FOUND);
    });
  }

  async register(user: UserModelDto): Promise<UserInterface> {
    this.logger.log(`[register] Register user ${JSON.stringify(user)}`);
    return this.userService.create(user);
  }

  decodeToken(token: string): {[key: string]: any} | string {
    this.jwtService.verify(token);
    return this.jwtService.decode(token);
  }
}
