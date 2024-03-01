import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('ko');
dayjs.tz.setDefault('Asia/Seoul');
dayjs.extend(duration);
dayjs.extend(isBetween);

export default dayjs;
