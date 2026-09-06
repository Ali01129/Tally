import { useLocalSearchParams, router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  GroupMembers,
  type InvitedMember,
} from "@/components/ui/create-group/group-members";
import { GroupDetailsHeader } from "@/components/ui/group-details/group-details-header";
import type { GroupMember } from "@/components/ui/group-details/types";
import { AddMembersModal } from "@/components/ui/group-settings/add-members-modal";
import {
  friendToMember,
  splitGroupMembers,
} from "@/components/ui/group-settings/utils";
import { Input } from "@/components/ui/input";
import { APP_USER, FRIENDS_LIST, GROUP_DETAILS } from "@/data/app-data";

function buildDisplayMembers(
  groupMembers: GroupMember[],
  members: InvitedMember[],
): GroupMember[] {
  const currentUserMember =
    groupMembers.find(
      (member) =>
        member.id === "maya" || member.name === APP_USER.displayName,
    ) ?? {
      id: "maya",
      name: APP_USER.displayName,
      initial: APP_USER.initial,
      avatarColor: APP_USER.avatarColor,
    };

  const otherMembers: GroupMember[] = members.map((member) => ({
    id: member.id,
    name: member.name,
    initial: member.initial,
    avatarColor: member.avatarColor ?? "#D4C5F0",
  }));

  return [currentUserMember, ...otherMembers];
}

const CONTENT_PADDING = 32;

export default function GroupSettingsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const group = GROUP_DETAILS[id ?? ""];

  const initialMembers = useMemo(
    () => (group ? splitGroupMembers(group.members).otherMembers : []),
    [group],
  );
  const savedMemberIds = useMemo(
    () => new Set(initialMembers.map((member) => member.id)),
    [initialMembers],
  );

  const [groupName, setGroupName] = useState(group?.name ?? "");
  const [members, setMembers] = useState<InvitedMember[]>(initialMembers);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);

  const memberIds = useMemo(() => {
    const ids = new Set<string>();
    group?.members.forEach((member) => ids.add(member.id));
    members.forEach((member) => ids.add(member.id));
    return ids;
  }, [group?.members, members]);

  const availableFriends = useMemo(
    () => FRIENDS_LIST.filter((friend) => !memberIds.has(friend.id)),
    [memberIds],
  );

  const displayMembers = useMemo(
    () => (group ? buildDisplayMembers(group.members, members) : []),
    [group, members],
  );

  if (!group) {
    return (
      <View className="flex-1 items-center justify-center bg-tally-background">
        <Text className="text-base text-tally-textSecondary">
          Group not found
        </Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!groupName.trim()) return;
    // Hook up to real save logic later.
    router.back();
  };

  const handleAddMembers = (friends: typeof FRIENDS_LIST) => {
    setMembers((prev) => [
      ...prev,
      ...friends.map((friend) => friendToMember(friend)),
    ]);
  };

  return (
    <>
      <ScrollView
        className="flex-1 bg-tally-background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + CONTENT_PADDING,
        }}
      >
        <GroupDetailsHeader
          variant="settings"
          groupId={group.id}
          name={groupName || group.name}
          type={group.type}
          timeline={group.timeline}
          members={displayMembers}
          onSave={handleSave}
          saveDisabled={!groupName.trim()}
        />

        <View
          className="gap-4 px-6"
          style={{ paddingTop: CONTENT_PADDING }}
        >
          <View className="gap-2">
            <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
              GROUP NAME
            </Text>
            <Input
              placeholder="Group name"
              value={groupName}
              onChangeText={setGroupName}
            />
          </View>

          <GroupMembers
            variant="settings"
            currentUser={{
              name: APP_USER.name,
              initial: APP_USER.initial,
              avatarColor: APP_USER.avatarColor,
            }}
            invitedMembers={members}
            canRemoveMember={(memberId) => !savedMemberIds.has(memberId)}
            onRemoveMember={(memberId) => {
              if (savedMemberIds.has(memberId)) return;
              setMembers((prev) => prev.filter((m) => m.id !== memberId));
            }}
            onAddPeople={() => setIsAddMembersOpen(true)}
          />
        </View>
      </ScrollView>

      <AddMembersModal
        isPresented={isAddMembersOpen}
        onDismiss={() => setIsAddMembersOpen(false)}
        friends={availableFriends}
        onAddMembers={handleAddMembers}
      />
    </>
  );
}
