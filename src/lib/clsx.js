/**
 * Tiny className joiner. Keeps the dependency list at zero for something
 * this small.
 */
export default function clsx(...parts) {
  return parts
    .flat(Infinity)
    .filter((p) => typeof p === 'string' && p.trim() !== '')
    .join(' ');
}
