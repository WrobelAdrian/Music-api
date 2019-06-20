import { PHONE_UTIL_TOKEN } from '../_common/constants';
import phoneValidatorLib = require('google-libphonenumber');
import {PhoneNumberUtil} from 'google-libphonenumber';

export const phoneNumberProviders = [
  {
    provide: PHONE_UTIL_TOKEN,
    useFactory: (): PhoneNumberUtil => phoneValidatorLib.PhoneNumberUtil.getInstance(),
  },
];
