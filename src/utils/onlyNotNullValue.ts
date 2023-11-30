/**
 * Generates a new object with only the non-null values from the given object.
 *
 * @param {T} obj - The object to filter.
 * @return {Partial<{ [key in keyof T]: NonNullable<T[key]> }>} A new object with only the non-null values.
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
