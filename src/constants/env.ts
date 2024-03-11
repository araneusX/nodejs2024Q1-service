const parseVariable = <TValue extends string | number | boolean>(
  variable: string | undefined | null,
  defaultValue: TValue,
): TValue => {
  if (!variable) {
    return defaultValue;
  }

  switch (typeof defaultValue) {
    case 'string':
      return variable as TValue;
    case 'boolean': {
      if (variable === 'true') {
        return true as TValue;
      }

      if (variable === 'false') {
        return false as TValue;
      }

      return defaultValue;
    }
    case 'number': {
      const numValue = Number(variable);

      if (isNaN(numValue)) {
        return defaultValue;
      }

      return numValue as TValue;
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

export const ENV = {
  PORT: parseVariable(process.env.PORT, 4000),
  CRYPT_SALT: parseVariable(process.env.CRYPT_SALT, 10),
  JWT_SECRET_KEY: parseVariable(process.env.JWT_SECRET_KEY, 'JWT_SECRET_KEY'),
  JWT_SECRET_REFRESH_KEY: parseVariable(
    process.env.JWT_SECRET_REFRESH_KEY,
    'JWT_SECRET_REFRESH_KEY',
  ),
  TOKEN_EXPIRE_TIME_MS:
    parsePeriod(process.env.TOKEN_EXPIRE_TIME) ?? 60 * 60 * 1000,
  TOKEN_REFRESH_EXPIRE_TIME_MS:
    parsePeriod(process.env.TOKEN_REFRESH_EXPIRE_TIME) ?? 24 * 60 * 60 * 1000,
};
