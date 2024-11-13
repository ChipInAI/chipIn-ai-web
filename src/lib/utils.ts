import { type ClassValue, clsx } from 'clsx';
import { setCookie } from 'nookies';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setApplicationCookie(
  name: string,
  value: string,
  options: object,
) {
  setCookie(null, name, value, options);
}
