import { USER_TOKEN } from '../_common/constants';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserInterface as UserEntity} from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { AppLogger } from '../app.logger';

@Injectable()
export class UserService {
  private logger = new AppLogger(UserService.name);

  constructor(@Inject(USER_TOKEN) private readonly userModel: Model<UserEntity>) {}

  public async findAll(): Promise<UserEntity[]> {
    this.logger.log(`[findAll] Find all users`);
    return await this.userModel.find().catch(error => {
      this.logger.log(`[findAll] Find all users failed: ${JSON.stringify(error)}`);
      throw new HttpException({
          error: 'User',
          message: `Find all failed with error: ${JSON.stringify(error)}`,
        }, HttpStatus.EXPECTATION_FAILED);
    });
  }

  public async findById(id: string): Promise<UserEntity> {
    this.logger.log(`[findById] Find user by id user: ${id}`);
    return await this.userModel.findById(id).catch(error => {
      this.logger.log(`[findById] Find user failed: ${JSON.stringify(error)}`);
      throw new HttpException({
          error: 'User',
          message: `Find by id failed with error: ${JSON.stringify(error)}`,
        }, HttpStatus.NOT_FOUND);
    });
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`[findByEmail] Find user by email : ${email}`);
    return await this.userModel.findOne({email}).catch(error => {
      this.logger.log(`[findByEmail] Find user failed by email: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'User',
        message: `Find by email failed with error: ${JSON.stringify(error)}`,
      }, HttpStatus.NOT_FOUND);
    });
  }

  public async create(user: UserDto): Promise<UserEntity> {
    const userEntity: UserEntity = await this.findByEmail(user.email);
    if (userEntity) {
      this.logger.log(`[create] Create user, user already exists: ${JSON.stringify(user)}`);
      throw new HttpException({
        error: 'User',
        message: 'User already exists',
      }, HttpStatus.BAD_REQUEST);
    }
    this.logger.log(`[create] Create user: ${JSON.stringify(user)}`);
    return await this.userModel.create(user).catch(error => {
      this.logger.log(`[create] Create user failed: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'User',
        message: `Create failed with error: ${JSON.stringify(error)}`,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }

  public async update(id: string, user: UserDto): Promise<UserEntity> {
    this.logger.log(`[update] Update user ${id} with data: ${JSON.stringify(user)}`);
    return await this.userModel.findByIdAndUpdate({_id: id}, user, {new: true}).catch(error => {
      this.logger.log(`[update] Update user failed: ${JSON.stringify(error)}`);
      throw new HttpException({
          error: 'User',
          message: `Update failed with error: ${JSON.stringify(error)}`,
        }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }

  public async delete(id: string): Promise<UserEntity> {
    this.logger.log(`[delete] Delete user with id: ${id}`);
    return await this.userModel.findByIdAndRemove(id).catch(error => {
      this.logger.log(`[delete] Delete user failed: ${JSON.stringify(error)}`);
      throw new HttpException({
          error: 'Delete',
          message: `Delete failed with error: ${JSON.stringify(error)}`,
        }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }
}
