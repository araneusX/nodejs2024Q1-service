export const parsePeriod = (period = ''): number | null => {
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
