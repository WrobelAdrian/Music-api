import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Patch, Post } from '@nestjs/common';
import { UserInterface as UserEntity} from './interfaces/user.interface';
import { UserService } from './user.service';
import { ApiImplicitBody, ApiResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ParsePhoneNumberPipe } from '../_pipes/phone-number.pipe';
import { UserDecorator } from '../_decorators/user.decorator';

@Controller('user')
@ApiUseTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  @ApiResponse({status: 200, description: 'Fetching users complete', type: UserDto})
  @ApiOperation({
    title: 'Get all users from database',
    description: 'Should return list off all users',
  })
  @HttpCode(HttpStatus.OK.valueOf())
  async findAll(@UserDecorator() user: UserEntity): Promise<UserDto[]> {
    if (!user) {
      throw new HttpException({
        error: 'Authorization',
        message: 'Authorization error',
      }, HttpStatus.UNAUTHORIZED);
    }
    return await this.userService.findAll();
  }

  @Get('self')
  @ApiResponse({status: 200, description: 'Find user success', type: UserDto})
  @ApiOperation({
    title: 'Get user from database',
    description: 'Should return user found by id',
  })
  @HttpCode(HttpStatus.OK.valueOf())
  async findSelf(@UserDecorator() user: UserEntity): Promise<UserDto> {
    if (!user) {
      throw new HttpException({
          error: 'Authorization',
          message: 'Authorization error',
        }, HttpStatus.UNAUTHORIZED);
    }
    return this.userService.findById(user.id);
  }

  @Post('self')
  @ApiResponse({status: 201, description: 'Create user complete', type: UserDto})
  @ApiOperation({
    title: 'Save new user to database',
    description: 'Should return newly created user',
  })
  @ApiImplicitBody({name: 'user', type: UserDto})
  @HttpCode(HttpStatus.OK.valueOf())
  async create(
    @UserDecorator() user: UserEntity,
    @Body(ParsePhoneNumberPipe) data: UserDto,
  ): Promise<UserDto> {
    if (!user) {
      throw new HttpException({
          error: 'Authorization',
          message: 'Authorization error',
        }, HttpStatus.UNAUTHORIZED);
    }
    return this.userService.create(data);
  }

  @Patch('self')
  @ApiImplicitBody({name: 'user', type: UserDto})
  @ApiResponse({status: 200, description: 'Update user complete', type: UserDto})
  @ApiOperation({
    title: 'Update user in database',
    description: 'Should return updated user',
  })
  @HttpCode(HttpStatus.OK.valueOf())
  async update(
    @UserDecorator() user: UserEntity,
    @Body(ParsePhoneNumberPipe) data: UserDto,
  ): Promise<UserDto> {
    if (!user) {
      throw new HttpException({
          error: 'Authorization',
          message: 'Authorization error',
        }, HttpStatus.UNAUTHORIZED);
    }
    return this.userService.update(user.id, data);
  }

  @Delete('self')
  @ApiResponse({status: 200, description: 'Delete user complete', type: UserDto})
  @ApiOperation({
    title: 'Delete user from database',
    description: 'Should return message if deletion was successful',
  })
  @HttpCode(HttpStatus.OK.valueOf())
  async delete(@UserDecorator() user: UserEntity): Promise<UserDto> {
    if (!user) {
      throw new HttpException({
          error: 'Authorization',
          message: 'Authorization error',
        }, HttpStatus.UNAUTHORIZED);
    }
    return this.userService.delete(user.id);
  }
}
