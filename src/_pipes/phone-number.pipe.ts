import { ArgumentMetadata, Inject, Injectable, PipeTransform } from '@nestjs/common';
import {PhoneNumberUtil} from 'google-libphonenumber';
import { PHONE_UTIL_TOKEN } from '../_common/constants';
import {PhoneNumberFormat} from 'google-libphonenumber';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class ParsePhoneNumberPipe implements PipeTransform<UserInterface, {[key: string]: any}> {
  constructor(@Inject(PHONE_UTIL_TOKEN) protected readonly phoneUtil: PhoneNumberUtil) {}

  transform(value: {[key: string]: any}, metadata: ArgumentMetadata): any {
    const phone = typeof value === 'string' ? value : value['phoneNumber'];
    if (!value || !phone) {
      return value;
    }
    const parsedPhoneNumber = this.phoneUtil.parse(phone);
    if (typeof value === 'string') {
      return this.phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.E164);
    }
    value['phoneNumber'] = this.phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.E164);
    return value;
  }
}
