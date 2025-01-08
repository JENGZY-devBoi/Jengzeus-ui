import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export default function cn(...classValue: ClassValue[]) {
    return twMerge(clsx(classValue));
}
