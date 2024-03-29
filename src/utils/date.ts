/**
 * Date utils
 */

// format date to locale date string
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

// convert milliseconds to hours, minutes and seconds
export const millisToHms = (millis: number): string => {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor(((millis % 3600000) % 60000) / 1000);

  const hoursStr = hours > 0 ? `${hours}:` : '';
  const minutesStr = minutes > 0 ? `${minutes < 10 ? `0${minutes}` : minutes}:` : '00:';
  const secondsStr = seconds > 0 ? `${seconds < 10 ? `0${seconds}` : seconds}` : '00';

  return `${hoursStr}${minutesStr}${secondsStr}`;
};

// convert hours, minutes and seconds to seconds
export function hmsToSeconds(time: string): number {
  const [seconds, minutes, hours = 0] = time
    .split(':')
    .map((el) => Number(el))
    .reverse();

  return hours * 3600 + minutes * 60 + seconds;
}

// check if date is older than given days
export function isDateOlderThanDays(date: Date, days: number): boolean {
  const now = new Date();
  const diffDays = Math.floor((Number(now) - Number(date)) / (1000 * 60 * 60 * 24));

  return diffDays >= days;
}
