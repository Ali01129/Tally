import type { SplitMethod } from "@/components/ui/add-expense/split-selector";

import type { SplitMember } from "./types";

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

export function redistributeSplitAmounts(
  members: SplitMember[],
  includedMemberIds: Set<string>,
  totalAmount: number,
): {
  exactAmounts: Record<string, string>;
  percentAmounts: Record<string, string>;
} {
  const includedCount = members.filter((member) =>
    includedMemberIds.has(member.id),
  ).length;
  const share =
    includedCount > 0 ? (totalAmount / includedCount).toFixed(2) : "0.00";
  const percent =
    includedCount > 0 ? String(Math.floor(100 / includedCount)) : "0";

  return {
    exactAmounts: Object.fromEntries(
      members.map((member) => [
        member.id,
        includedMemberIds.has(member.id) ? share : "",
      ]),
    ),
    percentAmounts: Object.fromEntries(
      members.map((member) => [
        member.id,
        includedMemberIds.has(member.id) ? percent : "",
      ]),
    ),
  };
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
    const parsed = Number.parseFloat(exactValue);
    const amount = Number.isNaN(parsed) ? 0 : parsed;
    return `${formatCurrency(amount)} per person`;
  }

  if (splitMethod === "percent") {
    const parsed = Number.parseInt(percentValue, 10);
    const percent = Number.isNaN(parsed) ? 0 : parsed;
    return `${formatCurrency((percent / 100) * totalAmount)} per person`;
  }

  return "";
}
