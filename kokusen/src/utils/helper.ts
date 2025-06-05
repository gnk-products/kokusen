/**
 * Generate a random string.
 *
 * @returns A random string.
 */
export const genRandomString = (): string => {
  return (Math.random() + 1).toString(36).substring(2);
};
