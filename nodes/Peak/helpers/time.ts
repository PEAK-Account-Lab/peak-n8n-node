export function formatTimestamp(date: Date, useLocal = false): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const yyyy = useLocal ? date.getFullYear() : date.getUTCFullYear();
  const MM = pad((useLocal ? date.getMonth() : date.getUTCMonth()) + 1);
  const dd = pad(useLocal ? date.getDate() : date.getUTCDate());
  const HH = pad(useLocal ? date.getHours() : date.getUTCHours());
  const mm = pad(useLocal ? date.getMinutes() : date.getUTCMinutes());
  const ss = pad(useLocal ? date.getSeconds() : date.getUTCSeconds());

  return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
}