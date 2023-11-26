// export function onlyNotNullValue<T extends object>(value: T) {
//   return Object.keys(value).reduce(
//     (acc, key) => {
//       if (value[key as keyof T] === null) {
//         return acc;
//       }
//       return {
//         ...acc,
//         [key]: value[key as keyof T],
//       };
//     },
//     {} as { [key in keyof T]: T[key] extends null ? undefined : T[key] }>
//   );
// }

/**
 * Filters out null values from an object and returns a new object with only non-null values.
 * @param obj - The object to filter.
 * @returns A new object with only non-null values.
 */
export function onlyNotNullValue<T extends object>(
  obj: T
): Partial<{ [key in keyof T]: NonNullable<T[key]> }> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null) {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {});
}
