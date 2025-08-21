// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolvePath(obj: any, path: string): string {
  return path
    .replace(/\[(\w+)\]/g, '.$1') // Convert bracket notation to dot notation
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj)
}
