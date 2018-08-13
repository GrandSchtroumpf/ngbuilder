export function toKebabCase(string: string) {
  return string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s/g, '-')
    .toLowerCase();
}

export function toPascalCase(string: string) {
  return string.match(/[a-z]+/gi)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join('');
}
