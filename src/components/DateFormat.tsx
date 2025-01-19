export function formatDate (date: Date) {
  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
};

export function getDateRange(startDate :Date, endDate :Date | null) {
  if (endDate == null) return formatDate(startDate);

  const sameDay :boolean = startDate.toDateString() === endDate.toDateString();
  return (sameDay ? 
    `${formatDate(startDate)} - ${formatDate(endDate).split(' ')[1]}` : 
    `${formatDate(startDate)} - ${formatDate(endDate)}` 
  );
}