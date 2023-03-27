export default function sanitize(name) {
  return name.trim().split('-').map(e => e[0].toUpperCase() + e.slice(1)).join(' ');
}