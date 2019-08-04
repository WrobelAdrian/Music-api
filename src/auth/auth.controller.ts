import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserModelDto } from '../user/dto/user-model.dto';
import { ParsePhoneNumberPipe } from '../_pipes/phone-number.pipe';
import { CredentialsDto } from './dto/credentials.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({status: 200, description: 'Log in success', type: UserModelDto})
  @ApiOperation({
    title: 'Log in user',
    description: 'Should log in user',
  })
  @ApiImplicitBody({name: 'credentials', type: CredentialsDto})
  @HttpCode(HttpStatus.OK.valueOf())
  async login(
    @Body() credentials: CredentialsDto,
  ): Promise<TokenDto> {
    const user = await this.authService.login(credentials);
    return await this.authService.signIn(user);
  }

  @Post('/register')
  @ApiResponse({status: 200, description: 'Register success'})
  @ApiOperation({
    title: 'Register user',
    description: 'Should register user',
  })
  @ApiImplicitBody({name: 'credentials', type: UserModelDto})
  @HttpCode(HttpStatus.OK.valueOf())
  async register(
    @Body(ParsePhoneNumberPipe) user: UserModelDto,
  ): Promise<UserModelDto> {
    return this.authService.register(user);
  }

  @Post('/token')
  @ApiResponse({status: 200, description: 'Is token verified'})
  @ApiOperation({
    title: 'Verify token',
    description: 'Should decodeToken token',
  })
  @ApiImplicitBody({name: 'token', type: String})
  @HttpCode(HttpStatus.OK.valueOf())
  async verifyToken(
    @Body() token: string,
  ): Promise<{[key: string]: any} | string > {
    // return await this.authService.verifyToken(token);
    return 'dupa';
  }
}
