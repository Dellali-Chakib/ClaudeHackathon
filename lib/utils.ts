import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${startFormatted} - ${endFormatted}`;
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}/month`;
}

export function getSpaceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    full_space: 'Full Space',
    storage: 'Storage Only',
    short_term: 'Short-term Stay'
  };
  return labels[type] || type;
}

export function getSpaceTypeColor(type: string): string {
  const colors: Record<string, string> = {
    full_space: 'bg-blue-100 text-blue-800',
    storage: 'bg-purple-100 text-purple-800',
    short_term: 'bg-orange-100 text-orange-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
}

