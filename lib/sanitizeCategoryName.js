export default function sanitize(name) {
  return name.split('-').map(e => e[0].toUpperCase() + e.slice(1)).join(' ');
}