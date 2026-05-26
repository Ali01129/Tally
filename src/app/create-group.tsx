import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CreateGroupHeader } from "@/components/ui/create-group/create-group-header";
import {
  GroupMembers,
  type InvitedMember,
} from "@/components/ui/create-group/group-members";
import { GroupPreview } from "@/components/ui/create-group/group-preview";
import {
  GroupTypeSelector,
  type GroupType,
} from "@/components/ui/create-group/group-type-selector";
import { Input } from "@/components/ui/input";

const MOCK_INVITED_MEMBERS: InvitedMember[] = [
  { id: "1", name: "Jordan", initial: "J", avatarColor: "#C5D8F0" },
  { id: "2", name: "Theo", initial: "T", avatarColor: "#F0E8C5" },
  { id: "3", name: "Priya", initial: "P", avatarColor: "#F0C5D8" },
];

function getInitials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "Gr";

  const firstTwo = trimmed.slice(0, 2);
  return `${firstTwo.charAt(0).toUpperCase()}${firstTwo.charAt(1).toLowerCase()}`;
}

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const [type, setType] = useState<GroupType>("trip");
  const [invitedMembers, setInvitedMembers] =
    useState<InvitedMember[]>(MOCK_INVITED_MEMBERS);

  const initials = useMemo(() => getInitials(groupName), [groupName]);

  const handleCreate = () => {
    // Hook up to real create logic later.
    if (!groupName.trim()) return;
  };

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="flex-1 gap-4 pt-2">
          <CreateGroupHeader
            onCreate={handleCreate}
            createDisabled={!groupName.trim()}
          />

          <GroupPreview initials={initials} />

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

          <GroupTypeSelector value={type} onChange={setType} />

          <GroupMembers
            currentUser={{ name: "Maya Chen", initial: "M" }}
            invitedMembers={invitedMembers}
            onRemoveMember={(id) =>
              setInvitedMembers((prev) => prev.filter((m) => m.id !== id))
            }
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
