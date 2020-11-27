export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object';
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

export function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isNumber(value: any): boolean {
  return typeof value === 'number';
}

export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}
