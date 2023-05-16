export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

export const millisToHms = (millis: number): string => {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor(((millis % 3600000) % 60000) / 1000);

  const hoursStr = hours > 0 ? `${hours}:` : '';
  const minutesStr = minutes > 0 ? `${minutes < 10 ? `0${minutes}` : minutes}:` : '00:';
  const secondsStr = seconds > 0 ? `${seconds < 10 ? `0${seconds}` : seconds}` : '00';

  return `${hoursStr}${minutesStr}${secondsStr}`;
};

export function hmsToSeconds(time: string): number {
  const [seconds, minutes, hours = 0] = time
    .split(':')
    .map((el) => Number(el))
    .reverse();

  return hours * 3600 + minutes * 60 + seconds;
}
