import type { MemberBalance } from "@/components/ui/group-details/types";

export type SettlePayer = {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;
  amount: number;
  direction: MemberBalance["direction"];
};

export type SettleCurrentUser = {
  name: string;
  initial: string;
  avatarColor: string;
};
