import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";

const MEMBER_AVATAR_COLORS = ["#D4C5F0", "#C5D8F0", "#F0E8C5", "#F0C5D8"];

export type InvitedMember = {
  id: string;
  name: string;
  initial: string;
  avatarColor?: string;
};

type GroupMembersProps = {
  currentUser: {
    name: string;
    initial: string;
    avatarColor?: string;
  };
  invitedMembers: InvitedMember[];
  onRemoveMember?: (id: string) => void;
  onAddPeople?: () => void;
  onShareLink?: () => void;
  onFromContacts?: () => void;
  variant?: "create" | "settings";
};

function MemberRow({
  children,
  isLast = false,
}: {
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3.5 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      {children}
    </View>
  );
}

function AdminTag() {
  return (
    <View className="rounded-full bg-tally-background px-3 py-1">
      <Text className="text-[10px] font-bold tracking-wide text-tally-textSecondary">
        ADMIN
      </Text>
    </View>
  );
}

function ShareLinkTag({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-1 rounded-full bg-tally-background px-3 py-1.5 active:opacity-80"
    >
      <MaterialIcons name="link" size={14} color="#808080" />
      <Text className="text-xs font-semibold text-tally-text">Share link</Text>
    </Pressable>
  );
}

export function GroupMembers({
  currentUser,
  invitedMembers,
  onRemoveMember,
  onAddPeople,
  onShareLink,
  onFromContacts,
  variant = "create",
}: GroupMembersProps) {
  const isSettings = variant === "settings";
  const memberCount = 1 + invitedMembers.length;

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
          MEMBERS · {memberCount}
        </Text>
      </View>

      <View className="overflow-hidden rounded-2xl bg-white">
        <MemberRow>
          <Avatar
            initial={currentUser.initial}
            backgroundColor={currentUser.avatarColor ?? MEMBER_AVATAR_COLORS[0]}
            size={40}
          />
          <View className="min-w-0 flex-1">
            <Text className="text-base font-bold text-tally-text">
              {currentUser.name}{" "}
              <Text className="font-normal text-tally-textSecondary">
                (you)
              </Text>
            </Text>
            <Text className="text-sm text-tally-textSecondary">
              Group owner
            </Text>
          </View>
          <AdminTag />
        </MemberRow>

        {invitedMembers.map((member, index) => (
          <MemberRow key={member.id}>
            <Avatar
              initial={member.initial}
              backgroundColor={
                member.avatarColor ??
                MEMBER_AVATAR_COLORS[(index + 1) % MEMBER_AVATAR_COLORS.length]
              }
              size={40}
            />
            <View className="min-w-0 flex-1">
              <Text className="text-base font-bold text-tally-text">
                {member.name}
              </Text>
              <Text className="text-sm text-tally-textSecondary">
                {isSettings ? "Member" : "Invite sent"}
              </Text>
            </View>
            <Pressable
              onPress={() => onRemoveMember?.(member.id)}
              className="h-8 w-8 items-center justify-center rounded-full bg-tally-primary active:opacity-80"
            >
              <Feather name="x" size={16} color="#ffffff" />
            </Pressable>
          </MemberRow>
        ))}

        <MemberRow isLast>
          <Pressable
            onPress={onAddPeople}
            className="h-10 w-10 items-center justify-center rounded-full border border-dashed border-black/15 active:opacity-80"
          >
            <Feather name="plus" size={20} color="#808080" />
          </Pressable>
          <Pressable
            onPress={onAddPeople}
            className="min-w-0 flex-1 active:opacity-80"
          >
            <Text className="text-base text-tally-textSecondary">
              {isSettings ? "Add new member" : "Add people or share link..."}
            </Text>
          </Pressable>
          {!isSettings ? <ShareLinkTag onPress={onShareLink} /> : null}
        </MemberRow>
      </View>
    </View>
  );
}
