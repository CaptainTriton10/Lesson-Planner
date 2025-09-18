import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const periods = ['0', '1', '2', '3', '4', '5', '6a', '6b', '7', '8', '9', '10'];

const NUM_PERIODS = periods.length;

function getPeriodName(period: number) {
  return periods[period];
}

export { getPeriodName, NUM_PERIODS };
