import { formatDate, hmsToSeconds, millisToHms } from '../date';

describe('formatDate', () => {
  it('should format date', () => {
    expect(formatDate('2020-01-01')).toEqual('1/1/2020');
  });
});

describe('millisToHms', () => {
  it('should convert milliseconds to hms with seconds', () => {
    expect(millisToHms(5000)).toEqual('00:05');
    expect(millisToHms(15000)).toEqual('00:15');
  });

  it('should convert milliseconds to hms with minutes', () => {
    expect(millisToHms(60000)).toEqual('01:00');
    expect(millisToHms(610000)).toEqual('10:10');
  });

  it('should convert milliseconds to hms with hours', () => {
    expect(millisToHms(3600000)).toEqual('1:00:00');
  });
});

describe('hmsToSeconds', () => {
  it('should convert hms to seconds', () => {
    expect(hmsToSeconds('00:05')).toEqual(5);
  });

  it('should convert hms to seconds with hours', () => {
    expect(hmsToSeconds('1:00:00')).toEqual(3600);
  });

  it('should convert hms to seconds with minutes', () => {
    expect(hmsToSeconds('01:00')).toEqual(60);
  });
});
