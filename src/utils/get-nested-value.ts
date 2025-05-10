type Paths<T> = any;
type NestedValue<T, P> = any;

export function getNestedValue<T extends object, P extends Paths<T>>(
  object: T,
  path: P,
): NestedValue<T, P> {
  const keys = (path as string).split(".");

  let current: object = object;
  for (const key of keys) {
    if (current && typeof current === "object") {
      current = current[key as keyof typeof current];
    }
  }
  return current as NestedValue<T, P>;
}
