import type { SplitMethod } from "@/components/ui/add-expense/split-selector";

export type SplitMember = {
  id: string;
  name: string;
  initial: string;
  avatarColor?: string;
};

export type ExpenseItem = {
  id: string;
  name: string;
  amount: number;
  includedMemberIds: string[];
};

export type SplitMembersListProps = {
  splitMethod: SplitMethod;
  totalAmount: string;
  members: SplitMember[];
};
