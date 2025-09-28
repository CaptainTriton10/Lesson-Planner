import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jwtDecode } from 'jwt-decode';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const periods = ['0', '1', '2', '3', '4', '5', '6a', '6b', '7', '8', '9', '10'];

const NUM_PERIODS = periods.length;

function getPeriodName(period: number) {
  return periods[period];
}

function verifyToken(token: string) {
  try {
    const decoded = jwtDecode(token);

    console.log(decoded, decoded.exp, Date.now() / 1000);

    if (!decoded.exp) return false;

    return decoded.exp <= Date.now() / 1000;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
}

export { getPeriodName, NUM_PERIODS, verifyToken };
