import { unstable_cache as cache } from "next/cache"
import type { unstable_cache } from "next/cache"

// A helper function to wrap Next.js's unstable_cache with a consistent keying and tagging strategy.
export const cached = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyParts: string[],
  options: Parameters<typeof unstable_cache>[2],
) => {
  // The key is a stable serialization of the function's name and its arguments.
  const key = [fn.name, ...keyParts].join("-")
  return cache(fn, [key], options)
}
