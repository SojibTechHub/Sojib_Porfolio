export const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const truncate = (str: string, len: number) =>
  str.length > len ? str.substring(0, len) + '...' : str;

export const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

export const formatDateRange = (start: string, end: string, current: boolean) => {
  if (current) return `${start} — Present`;
  return `${start} — ${end || 'Present'}`;
};
