export function msToMin(ms: number): string {
  const min = Math.floor(ms / 60000);
  const sec = ((ms % 60000) / 1000).toFixed(0);

  return `${min}:${sec < '10' ? '0' : ''}${sec}`;
}
