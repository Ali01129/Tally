import type { InvitedMember } from "@/components/ui/create-group/group-members";
import type { GroupMember } from "@/components/ui/group-details/types";
import { APP_USER } from "@/data/app-data";

export function splitGroupMembers(members: GroupMember[]): {
  otherMembers: InvitedMember[];
} {
  const otherMembers = members
    .filter(
      (member) =>
        member.id !== "maya" && member.name !== APP_USER.displayName,
    )
    .map((member) => ({
      id: member.id,
      name: member.name,
      initial: member.initial,
      avatarColor: member.avatarColor,
    }));

  return { otherMembers };
}

export function friendToMember(friend: {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;
}): InvitedMember {
  return {
    id: friend.id,
    name: friend.name,
    initial: friend.initial,
    avatarColor: friend.avatarColor,
  };
}
