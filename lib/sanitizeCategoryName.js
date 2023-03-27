export default function sanitize(name) {
  return name
    .trim()
    .split('-')
    .map(e => e[0].toUpperCase() + e.slice(1))
    .join(' ')
    .normalize('NFD')
    .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');
}