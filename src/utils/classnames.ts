export function cn(...classes: unknown[]) {
  return classes.filter((c) => typeof c === "string").join(" ");
}
