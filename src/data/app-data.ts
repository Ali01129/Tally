import type { SplitMember } from "@/components/ui/add-expense/split-members-list";
import type { FriendData } from "@/components/ui/friends/friend-item";
import type { InvitedMember } from "@/components/ui/create-group/group-members";
import type { ActivityItem } from "@/components/ui/activity/types";
import type { GroupDetailsData } from "@/components/ui/group-details/types";
import type { HomeGroupItemData } from "@/components/ui/home/home-group-item";

import appData from "./app-data.json";

type AppGroupRecord = GroupDetailsData &
  HomeGroupItemData & {
    initials: string;
    participants: string[];
    totalParticipants: number;
    status: HomeGroupItemData["status"];
    amount?: number;
  };

type AppData = {
  user: {
    name: string;
    displayName: string;
    initial: string;
  };
  home: {
    netBalance: string;
    owedAmount: string;
    oweAmount: string;
  };
  groups: AppGroupRecord[];
  addExpense: {
    members: SplitMember[];
  };
  createGroup: {
    invitedMembers: InvitedMember[];
  };
  friends: {
    summary: {
      owedAmount: string;
      owedPeopleCount: number;
      oweAmount: string;
      owePeopleCount: number;
    };
    list: FriendData[];
  };
};

const data = appData as AppData;

export const APP_USER = data.user;
export const HOME_BALANCE_CARD = data.home;

export const HOME_GROUPS: HomeGroupItemData[] = data.groups.map(
  ({
    id,
    name,
    initials,
    participants,
    totalParticipants,
    status,
    amount,
  }) => ({
    id,
    name,
    initials,
    participants,
    totalParticipants,
    status,
    amount,
  }),
);

export const GROUP_DETAILS = Object.fromEntries(
  data.groups.map((group) => [group.id, group]),
) as Record<string, GroupDetailsData>;

export const ADD_EXPENSE_GROUPS = data.groups.map(({ id, name, initials }) => ({
  id,
  name,
  initials,
}));

export const ADD_EXPENSE_MEMBERS: SplitMember[] = data.addExpense.members;
export const CREATE_GROUP_INVITED_MEMBERS: InvitedMember[] =
  data.createGroup.invitedMembers;

export const FRIENDS_SUMMARY = data.friends.summary;
export const FRIENDS_LIST: FriendData[] = data.friends.list;

export const ALL_ACTIVITY: ActivityItem[] = data.groups
  .flatMap((group) =>
    group.transactions.map((transaction) => {
      const payer = group.members.find(
        (member) => member.id === transaction.paidByMemberId,
      );

      return {
        ...transaction,
        groupId: group.id,
        groupName: group.name,
        paidByName: payer?.name ?? "Someone",
      };
    }),
  )
  .sort((left, right) => right.date.localeCompare(left.date));
