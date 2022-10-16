import moment from 'moment';

const getGMT = () => {
  let date = new Date();
  const offset = date.getTimezoneOffset();
  const GMT = offset / 60 < 0 ? '+' + Math.abs(offset / 60) : (offset / 60) * -1;

  return 'GMT' + GMT;
};

const getLocalDate = (time: string) => {
  let date = new Date(time);
  return date;
};

export const convertTime = (time: string) => {
  if (time === undefined) return '';

  const date = getLocalDate(time);
  const GMT = getGMT();

  return (
    moment(new Date(date)).format('MMMM DD, YYYY') + '\n' + moment(new Date(date)).format('HH:mm:ss') + ` (${GMT})`
  );
};

export const createTextEllipsis = (value: string, startPoint: number, endPoint: number) => {
  let length = value.length;
  if (length > 12)
    return value.substring(0, startPoint) + '...' + value.substring(value.length - endPoint, value.length);
  return value;
};

export const convertNumber = (value: any) => {
  if (!Number(value)) return 0;
  return Number(value);
};

export const convertCurrent = (value: number | string) => {
  var val = value.toString().split('.');
  val[0] = val[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return val.join('.');
};

export const createDecimalPoint = (value: string | number, point: number = 2) => {
  if (value === undefined) return '0';
  const val = convertNumber(value).toString();
  const pointPos = val.indexOf('.');

  if (pointPos === -1) return Number(val).toFixed(point);

  const splitValue = val.split('.');
  const belowDecimal = splitValue[1].substring(0, point);
  return Number(`${splitValue[0]}.${belowDecimal}`).toFixed(point);
};
