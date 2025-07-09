export function cn(value: unknown) {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    let c = '';

    for (const v of value) {
      c += cn(v) + ' ';
    }

    return c.trim();
  }

  if (typeof value === 'object') {
    let c = '';

    for (const [key, v] of Object.entries(value)) {
      if (v) {
        c += key + ' ';
      }
    }

    return c.trim();
  }

  return (value + '').trim();
}
