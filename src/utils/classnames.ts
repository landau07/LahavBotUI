// join a strings with condition to build class names:
// Usage: cn("h-10", true && "bg-white") -> "h-10 bg-white"
export function cn(...classes: unknown[]) {
  return classes.filter((c) => typeof c === "string").join(" ");
}
