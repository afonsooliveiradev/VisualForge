export function filterFiniteValues<T extends { value: number }>(data: T[]): T[] {
  return data.filter((item) => Number.isFinite(item.value));
}
