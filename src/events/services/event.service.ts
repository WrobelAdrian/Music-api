import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EVENT_TOKEN } from '../../_common/constants';
import { EventInterface as EventEntity } from '../interfaces/event.interface';
import { Model } from 'mongoose';
import { AppLogger } from '../../app.logger';
import { EventModelDto } from '../dto/event-model.dto';

@Injectable()
export class EventService {
  private logger = new AppLogger(EventService.name);

  constructor(@Inject(EVENT_TOKEN) private readonly eventModel: Model<EventEntity>) {
  }

  public async findById(id: string): Promise<EventEntity> {
    this.logger.log(`[findById] Find event by id: ${id}`);
    return await this.eventModel.findById(id).catch(error => {
      this.logger.log(`[findById] Find event failed: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'Event',
        message: `Find by id failed with error: ${JSON.stringify(error)}`,
      }, HttpStatus.NOT_FOUND);
    });
  }

  public async create(event: EventModelDto): Promise<EventEntity> {
    this.logger.log(`[create] Create event: ${JSON.stringify(event)}`);
    return await this.eventModel.create(event).catch(error => {
      this.logger.log(`[create] Create event failed: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'Event',
        message: `Create failed with error: ${JSON.stringify(error)}`,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }

  public async update(id: string, event: EventModelDto): Promise<EventEntity> {
    this.logger.log(`[update] Update event ${id} with data: ${JSON.stringify(event)}`);
    return await this.eventModel.findByIdAndUpdate({_id: id}, event, {new: true}).catch(error => {
      this.logger.log(`[update] Update event failed: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'Event',
        message: `Update failed with error: ${JSON.stringify(error)}`,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }

  public async delete(id: string): Promise<EventEntity> {
    this.logger.log(`[delete] Delete event with id: ${id}`);
    return await this.eventModel.findByIdAndRemove(id).catch(error => {
      this.logger.log(`[delete] Delete event failed: ${JSON.stringify(error)}`);
      throw new HttpException({
        error: 'Event',
        message: `Delete failed with error: ${JSON.stringify(error)}`,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }
}
