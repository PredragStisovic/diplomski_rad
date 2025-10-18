export function handleEquals(field: any, value: any) {
  return Array.isArray(value) ? { [field]: { in: value } } : { [field]: value };
}

export function handleLike(field: any, value: any) {
  return Array.isArray(value)
    ? {
      OR: value.map((val) => ({ [field]: { contains: val } })),
    }
    : { [field]: { contains: value } };
}

export function handleCaseInsensitiveLike(field: any, value: any) {
  return Array.isArray(value)
    ? {
      OR: value.map((val) => ({ [field]: { contains: val, mode: 'insensitive' } })),
    }
    : { [field]: { contains: value, mode: 'insensitive' } };
}

export function handleLessThan(field: any, value: any) {
  return { [field]: { lt: value } };
}

export function handleGreaterThan(field: any, value: any) {
  return { [field]: { gt: value } };
}

export function handleLessThanOrEqual(field: any, value: any) {
  return { [field]: { lte: value } };
}

export function handleGreaterThanOrEqual(field: any, value: any) {
  return { [field]: { gte: value } };
}

export function handleBetweenInclusive(field: any, value: any) {
  const [min, max] = value;
  return { [field]: { gte: min, lte: max } };
}

export function handleBetweenExclusive(field: any, value: any) {
  const [min, max] = value;
  return { [field]: { gt: min, lt: max } };
}

export function handleIs(field: any, value: any) {
  return { [field]: { equals: value } };
}

export function handleIsNot(field: any, value: any) {
  return { [field]: { not: value } };
}

export function handleSome(field: any, value: any) {
  return { some: { [field]: value } }
}
