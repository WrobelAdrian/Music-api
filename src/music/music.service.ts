import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AppLogger } from '../app.logger';
import { CategoryEnum } from './enum/category.enum';
import { AnythingEnum } from './enum/anything.enum';
import { config } from '../config';

@Injectable()
export class MusicService {
  private logger = new AppLogger(MusicService.name);
  private DEEZER_URL = config.deezer.deezerUrl;
  private HEADERS = config.deezer.deezerHeaders;
  constructor() {}

  async getItem(category: CategoryEnum, id: string): Promise<AxiosResponse> {
    this.logger.log(`[getItem] Fetching ${category} by id: ${id}`);
    return await axios.get(`${this.DEEZER_URL}${category}/${id}`, {
      headers: this.HEADERS,
    })
      .then(res => res.data)
      .catch(err => {
        this.logger.log(`[getItem] Fetching failed: ${JSON.stringify(err)}`);
        throw new HttpException({
          error: 'Deezer',
          message: `Getting ${category} failed with error: ${JSON.stringify(err)}`,
        }, HttpStatus.EXPECTATION_FAILED);
      });
  }

  async search(category: CategoryEnum, keyword: string): Promise<AxiosResponse> {
    this.logger.log(`[search] Searching ${category} by keyword: ${keyword}`);
    return await axios.get(`${this.DEEZER_URL}search?q=${category}:"${keyword}"`, {
      headers: this.HEADERS,
    })
      .then(res => res.data)
      .catch(err => {
        this.logger.log(`[search] Searching failed: ${JSON.stringify(err)}`);
        throw new HttpException({
            error: 'Deezer',
            message: `Search failed with error: ${JSON.stringify(err)}`,
          }, HttpStatus.EXPECTATION_FAILED);
      });
  }

  async getAnything(anything: AnythingEnum): Promise<AxiosResponse> {
    this.logger.log(`[getAnything] Fetching ${anything}`);
    return await axios.get(`${this.DEEZER_URL}${anything}`, {
      headers: this.HEADERS,
    })
      .then(res => res.data)
      .catch(err => {
        this.logger.log(`[getAnything] Fetching failed: ${JSON.stringify(err)}`);
        throw new HttpException({
            error: 'Deezer',
            message: `Getting ${anything} failed with error: ${JSON.stringify(err)}`,
          }, HttpStatus.EXPECTATION_FAILED);
      });
  }
}
