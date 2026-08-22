import type { ActivityItem, ActivitySection } from "./types";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function formatDateLabel(dateKey: string): string {
  const date = parseDateKey(dateKey);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) {
    return "TODAY";
  }

  if (isSameDay(date, yesterday)) {
    return "YESTERDAY";
  }

  const day = date.getDate();
  const month = MONTH_LABELS[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export function groupActivityByDate(items: ActivityItem[]): ActivitySection[] {
  const sections = new Map<string, ActivityItem[]>();

  for (const item of items) {
    const existing = sections.get(item.date);

    if (existing) {
      existing.push(item);
    } else {
      sections.set(item.date, [item]);
    }
  }

  return Array.from(sections.entries())
    .sort(([leftDate], [rightDate]) => rightDate.localeCompare(leftDate))
    .map(([dateKey, dayItems]) => ({
      dateKey,
      label: formatDateLabel(dateKey),
      items: dayItems,
    }));
}
