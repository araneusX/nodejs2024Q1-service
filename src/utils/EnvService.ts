import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type Widen<T extends string | number | boolean> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T;

const parseVariable = <TValue extends string | number | boolean>(
  variable: string | undefined | null,
  defaultValue: TValue,
): Widen<TValue> => {
  if (!variable) {
    return defaultValue as Widen<TValue>;
  }

  switch (typeof defaultValue) {
    case 'string':
      return variable as Widen<TValue>;
    case 'boolean': {
      if (variable === 'true') {
        return true as Widen<TValue>;
      }

      if (variable === 'false') {
        return false as Widen<TValue>;
      }

      return defaultValue as Widen<TValue>;
    }
    case 'number': {
      const numValue = Number(variable);

      if (isNaN(numValue)) {
        return defaultValue as Widen<TValue>;
      }

      return numValue as Widen<TValue>;
    }
  }
};

const parsePeriod = (period = ''): number | null => {
  if (!period) {
    return null;
  }

  const periodType = period.slice(-1);

  const periodValue = Number(period.slice(0, -1));

  if (isNaN(periodValue)) {
    return null;
  }

  switch (periodType) {
    case 'd':
      return periodValue * 24 * 60 * 60 * 1000;
    case 'h':
      return periodValue * 60 * 60 * 1000;
    case 'm':
      return periodValue * 60 * 1000;
    case 's':
      return periodValue * 1000;
    case 'ms':
      return periodValue;
    default:
      isNaN(Number(period)) ? null : Number(period);
  }
};

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get PORT() {
    return parseVariable(this.configService.get('PORT'), 4000);
  }

  get CRYPT_SALT() {
    return parseVariable(this.configService.get('CRYPT_SALT'), 10);
  }

  get JWT_SECRET_KEY() {
    return parseVariable(
      this.configService.get('JWT_SECRET_KEY'),
      'JWT_SECRET_KEY',
    );
  }

  get JWT_SECRET_REFRESH_KEY() {
    return parseVariable(
      this.configService.get('JWT_SECRET_REFRESH_KEY'),
      'JWT_SECRET_REFRESH_KEY',
    );
  }

  get TOKEN_EXPIRE_TIME_MS() {
    return (
      parsePeriod(this.configService.get('TOKEN_EXPIRE_TIME')) ?? 60 * 60 * 1000
    );
  }

  get TOKEN_REFRESH_EXPIRE_TIME_MS() {
    return (
      parsePeriod(this.configService.get('TOKEN_REFRESH_EXPIRE_TIME_MS')) ??
      24 * 60 * 60 * 1000
    );
  }
}
