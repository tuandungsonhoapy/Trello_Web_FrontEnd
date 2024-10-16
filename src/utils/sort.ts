export function mapOrder<T extends { [key: string]: any }>(
  array: T[],
  order: string[],
  key: string
) {
  return [...array].sort(
    (a, b) => order.indexOf(a[key]) - order.indexOf(b[key])
  )
}
