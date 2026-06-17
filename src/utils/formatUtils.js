export const formatCurrency = (amount) =>
  amount == null ? '–' : new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

export const formatPriceRange = ({ min, max }) => `${formatCurrency(min)} – ${formatCurrency(max)}`;

export const formatDistance = (km) => {
  if (km == null) return '';
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1).replace('.', ',')} km`;
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(/\s+/).slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join('');
};

export const truncate = (str, maxLength = 60) =>
  !str ? '' : (str.length <= maxLength ? str : `${str.slice(0, maxLength - 1)}…`);

export default { formatCurrency, formatPriceRange, formatDistance, getInitials, truncate };
