type Widen<T extends string | number | boolean> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T;

export const parseVariable = <TValue extends string | number | boolean>(
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
