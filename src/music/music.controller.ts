import { Controller, Get, HttpCode, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiImplicitParam} from '@nestjs/swagger';
import { MusicService } from './music.service';
import { CategoryEnum } from './enum/category.enum';
import { AnythingEnum } from './enum/anything.enum';
import { UserDecorator } from '../_decorators/user.decorator';
import { UserInterface } from '../user/interfaces/user.interface';
import { AxiosResponse } from 'axios';

@Controller('music')
@ApiUseTags('music')
export class MusicController {
  constructor(protected musicService: MusicService) {}

  @Get(':category/:id')
  @ApiResponse({status: 200, description: 'Fetch success'})
  @ApiOperation({
    title: 'Fetch',
    description: 'Should fetch category data',
  })
  @ApiImplicitParam({name: 'category', type: CategoryEnum})
  @ApiImplicitParam({name: 'track id', type: String})
  @HttpCode(HttpStatus.OK.valueOf())
  public async getTrack(@UserDecorator() user: UserInterface, @Param('category') category: CategoryEnum, @Param('id') trackId: string): Promise<AxiosResponse> {
    if (!user) {
      throw new HttpException({
          error: 'Authorization',
          message: 'Authorization error',
        }, HttpStatus.UNAUTHORIZED);
    }
    return await this.musicService.getItem(category, trackId);
  }

  @Get('search/:category/:keyword')
  @ApiResponse({status: 200, description: 'Search success'})
  @ApiOperation({
    title: 'Search',
    description: 'Should search category data',
  })
  @HttpCode(HttpStatus.OK.valueOf())
  @ApiImplicitParam({name: 'category', type: CategoryEnum})
  @ApiImplicitParam({name: 'keyword', type: String})
  public async search(@UserDecorator() user: UserInterface, @Param('category') category: CategoryEnum, @Param('keyword') keyword: string): Promise<AxiosResponse> {
    if (!user) {
      throw new HttpException({
          error: 'Authorization',
          message: 'Authorization error',
        }, HttpStatus.UNAUTHORIZED);
    }
    return await this.musicService.search(category, keyword);
  }

  @Get(':anything')
  @ApiResponse({status: 200, description: 'Anything success'})
  @ApiOperation({
    title: 'Anything',
    description: 'Should fetch anything',
  })
  @HttpCode(HttpStatus.OK.valueOf())
  @ApiImplicitParam({name: 'anything', type: AnythingEnum})
  public async anything(@UserDecorator() user: UserInterface, @Param('anything') anything: AnythingEnum): Promise<AxiosResponse> {
    if (!user) {
      throw new HttpException({
          error: 'Authorization',
          message: 'Authorization error',
        }, HttpStatus.UNAUTHORIZED);
    }
    return await this.musicService.getAnything(anything);
  }
}
