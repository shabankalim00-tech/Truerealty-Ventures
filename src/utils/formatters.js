export function formatPrice(price, transactionType = 'Buy') {
  if (price === undefined || price === null || isNaN(price) || price === 0 || price === '0') return 'Price on Request';

  if (transactionType === 'Rent' || transactionType === 'rent') {
    return `₹ ${Number(price).toLocaleString('en-IN')} / mo`;
  }

  const num = Number(price);
  if (num >= 10000000) {
    const cr = num / 10000000;
    return `₹ ${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    const lac = num / 100000;
    return `₹ ${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(2)} Lac`;
  }
  return `₹ ${num.toLocaleString('en-IN')}`;
}

export function formatArea(sqFt) {
  if (!sqFt) return '';
  return `${Number(sqFt).toLocaleString('en-IN')} sq.ft.`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
