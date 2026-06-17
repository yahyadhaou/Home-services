export const formatDate = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
};

export const formatTime = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
};

export const timeAgo = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const diffMin = Math.floor((new Date() - d) / 60000);
  if (diffMin < 1) return 'Gerade eben';
  if (diffMin < 60) return `Vor ${diffMin} Min`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `Vor ${diffHour} Std`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return 'Gestern';
  if (diffDay < 7) return `Vor ${diffDay} Tagen`;
  return formatDate(d);
};

export const buildCalendarGrid = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
};

export default { formatDate, formatTime, timeAgo, buildCalendarGrid };
