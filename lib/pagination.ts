export const BLOG_PAGE_SIZE = 12

export function parsePageParam(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value
  const parsedValue = Number.parseInt(rawValue ?? '1', 10)
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 1
}
