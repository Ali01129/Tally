import type { SplitMethod } from "@/components/ui/add-expense/split-selector";

export function sanitizeDecimalInput(text: string): string {
  const cleaned = text.replace(/[^0-9.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  const fraction = rest.join("").slice(0, 2);

  if (rest.length === 0) {
    return whole;
  }

  return `${whole}.${fraction}`;
}

export function sanitizePercentInput(text: string): string {
  return text.replace(/[^0-9]/g, "");
}

export function clampDecimalInput(value: string, max: number): string {
  const sanitized = sanitizeDecimalInput(value);

  if (!sanitized) {
    return "";
  }

  if (sanitized === ".") {
    return sanitized;
  }

  const hasTrailingDot = sanitized.endsWith(".");
  const parsed = Number.parseFloat(sanitized);

  if (Number.isNaN(parsed)) {
    return "";
  }

  if (parsed > max) {
    return max.toFixed(2);
  }

  if (hasTrailingDot && sanitized.indexOf(".") === sanitized.length - 1) {
    return sanitized;
  }

  return sanitized;
}

export function clampPercentInput(value: string): string {
  if (!value) {
    return "";
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    return "";
  }

  return String(Math.min(100, Math.max(0, parsed)));
}

export function formatCurrency(amount: number): string {
  if (Number.isNaN(amount)) {
    return "$0.00";
  }

  return `$${amount.toFixed(2)}`;
}

export function getDefaultExactShare(
  includedCount: number,
  totalAmount: number,
): string {
  return includedCount > 0
    ? (totalAmount / includedCount).toFixed(2)
    : "0.00";
}

export function getDefaultPercentShare(includedCount: number): string {
  return includedCount > 0 ? String(Math.floor(100 / includedCount)) : "0";
}

export function resolveExactShare(
  value: string,
  includedCount: number,
  totalAmount: number,
): number {
  if (value) {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  const parsed = Number.parseFloat(
    getDefaultExactShare(includedCount, totalAmount),
  );
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function resolvePercentShare(
  value: string,
  includedCount: number,
): number {
  if (value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  const parsed = Number.parseInt(getDefaultPercentShare(includedCount), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getMemberShareLabel(
  splitMethod: SplitMethod,
  isIncluded: boolean,
  totalAmount: number,
  includedCount: number,
  exactValue: string,
  percentValue: string,
): string {
  if (!isIncluded) {
    return "Not included";
  }

  if (splitMethod === "equal") {
    if (includedCount === 0) {
      return `${formatCurrency(0)} per person`;
    }

    return `${formatCurrency(totalAmount / includedCount)} per person`;
  }

  if (splitMethod === "exact") {
    const amount = resolveExactShare(exactValue, includedCount, totalAmount);
    return `${formatCurrency(amount)} per person`;
  }

  if (splitMethod === "percent") {
    const percent = resolvePercentShare(percentValue, includedCount);
    return `${formatCurrency((percent / 100) * totalAmount)} per person`;
  }

  return "";
}
