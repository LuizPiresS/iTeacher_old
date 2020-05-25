/**
 *
 * Check if the value is a instance of some constructors
 *
 * @param value a class
 * @param constructors a item or list of constructors
 */
export function isInstanceOf<T>(value: T, constructors: any | any[]): boolean {
  if (Array.isArray(constructors)) {
    return constructors.some((constructor) => value instanceof constructor);
  }

  return value instanceof constructors;
}
