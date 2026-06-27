export type GroupMember = {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;
};

export type MemberBalance = {
  memberId: string;
  amount: number;
  direction: "owes_you" | "you_owe";
};

export type GroupDetailsData = {
  id: string;
  name: string;
  type: "trip" | "home" | "couple" | "other";
  timeline?: string;
  members: GroupMember[];
  balanceStatus: "owed" | "owe";
  totalAmount: number;
  memberBalances: MemberBalance[];
};
