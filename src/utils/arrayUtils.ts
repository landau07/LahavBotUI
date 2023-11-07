/**
Example usage:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Use the takeUntil function to take elements until a condition is met, including the element that satisfies the predicate.
const result = takeUntil(numbers, (num) => num === 5);

console.log(result); // Output: [1, 2, 3, 4, 5]
 */
export function takeUntil<T>(array: T[], predicate: (item: T) => boolean): T[] {
  const index = array.findIndex(predicate);
  if (index === -1) {
    // If the predicate is not satisfied, return the entire array.
    return [...array];
  }
  return array.slice(0, index + 1);
}
