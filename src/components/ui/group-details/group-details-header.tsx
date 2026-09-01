import { Feather } from "@expo/vector-icons";
import { type Href, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";

import type { GroupMember } from "./types";

type GroupDetailsHeaderProps = {
  groupId: string;
  name: string;
  type: string;
  timeline?: string;
  members: GroupMember[];
  variant?: "details" | "settings";
  onSave?: () => void;
  saveDisabled?: boolean;
};

const AVATAR_SIZE = 36;
const AVATAR_OVERLAP = 12;

function formatMemberNames(members: GroupMember[]): string {
  return members.map((member) => member.name).join(", ");
}

export function GroupDetailsHeader({
  groupId,
  name,
  type,
  timeline,
  members,
  variant = "details",
  onSave,
  saveDisabled = false,
}: GroupDetailsHeaderProps) {
  const insets = useSafeAreaInsets();
  const isSettings = variant === "settings";

  const timelineLabel = timeline
    ? `${type.toUpperCase()} · ${timeline}`
    : type.toUpperCase();

  return (
    <View className="overflow-hidden bg-tally-groupBg">
      <View className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-tally-groupCircles" />
      <View className="absolute -left-12 bottom-[-20%] h-48 w-48 rounded-full bg-tally-groupCircles" />

      <View
        style={{ paddingTop: insets.top + 8 }}
        className="relative px-6 pb-2"
      >
        <View className="mb-20 flex-row items-center justify-between">
          <IconButton
            icon={<Feather name="arrow-left" size={20} color="#000000" />}
            onPress={() => router.back()}
          />
          {isSettings ? (
            <Pressable
              onPress={onSave}
              disabled={saveDisabled}
              className={saveDisabled ? "opacity-40" : "active:opacity-80"}
            >
              <View className="rounded-full bg-tally-primary px-4 py-2">
                <Text className="text-sm font-semibold text-white">Save</Text>
              </View>
            </Pressable>
          ) : (
            <IconButton
              icon={
                <Feather name="more-horizontal" size={20} color="#000000" />
              }
              onPress={() =>
                router.push(`/group-settings/${groupId}` as Href)
              }
            />
          )}
        </View>

        <View className="self-start rounded-full bg-white/60 px-3 py-1">
          <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
            {timelineLabel}
          </Text>
        </View>

        <Text className="mt-3 text-4xl font-bold text-tally-text">{name}</Text>

        <View className="mt-4 flex-row items-center">
          <View className="flex-row items-center">
            {members.map((member, index) => (
              <View
                key={member.id}
                style={index > 0 ? { marginLeft: -AVATAR_OVERLAP } : undefined}
                className="rounded-full border-2 border-tally-groupBg"
              >
                <Avatar
                  initial={member.initial}
                  backgroundColor={member.avatarColor}
                  size={AVATAR_SIZE}
                />
              </View>
            ))}
          </View>

          <Text
            className="ml-3 flex-1 text-sm text-tally-textSecondary"
            numberOfLines={1}
          >
            {formatMemberNames(members)}
          </Text>
        </View>
      </View>
    </View>
  );
}
