export function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function splitAmount(amount: number): {
  dollars: string;
  cents: string;
} {
  const [dollars, cents] = amount.toFixed(2).split(".");
  return { dollars, cents };
}

export function formatSettleDate(date: Date): string {
  const today = new Date();
  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();

  if (isToday) {
    return "Today";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
