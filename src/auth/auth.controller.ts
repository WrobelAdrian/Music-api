import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { ParsePhoneNumberPipe } from '../_pipes/phone-number.pipe';
import { CredentialsDto } from './dto/credentials.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({status: 200, description: 'Log in success', type: UserDto})
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
  @ApiImplicitBody({name: 'credentials', type: UserDto})
  @HttpCode(HttpStatus.OK.valueOf())
  async register(
    @Body(ParsePhoneNumberPipe) user: UserDto,
  ): Promise<UserDto> {
    return this.authService.register(user);
  }
}
