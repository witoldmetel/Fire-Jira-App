import { format, formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export const formatTime = (time: Timestamp) => format(time.toDate(), 'dd.MM.yyyy H:mm');
export const formatTimeFromNow = (time: Timestamp) => formatDistanceToNow(time.toDate(), { addSuffix: true });
