import type { GroupTransaction } from "@/components/ui/group-details/types";

export type ActivityItem = GroupTransaction & {
  groupId: string;
  groupName: string;
  paidByName: string;
};

export type ActivitySection = {
  dateKey: string;
  label: string;
  items: ActivityItem[];
};
