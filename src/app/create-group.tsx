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
import { APP_USER, CREATE_GROUP_INVITED_MEMBERS } from "@/data/app-data";

function getInitials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "Gr";

  const firstTwo = trimmed.slice(0, 2);
  return `${firstTwo.charAt(0).toUpperCase()}${firstTwo.charAt(1).toLowerCase()}`;
}

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const [type, setType] = useState<GroupType>("trip");
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>(
    CREATE_GROUP_INVITED_MEMBERS,
  );

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
            currentUser={{ name: APP_USER.name, initial: APP_USER.initial }}
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
