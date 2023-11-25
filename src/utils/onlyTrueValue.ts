export function onlyNotNullValue<T extends object>(value: T) {
  return Object.keys(value).reduce(
    (acc, key) => {
      if (value[key as keyof T] === null) {
        return acc;
      }
      return {
        ...acc,
        [key]: value[key as keyof T],
      };
    },
    {} as Record<keyof T, NonNullable<T[keyof T]> | undefined>
  );
}
