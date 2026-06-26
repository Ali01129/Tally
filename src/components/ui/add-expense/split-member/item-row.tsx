import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";

import { MEMBER_AVATAR_COLORS, REMOVE_ITEM_COLOR } from "./constants";
import { ItemSelectionRow } from "./item-selection-row";
import { OverlappingAvatars } from "./overlapping-avatars";
import type { ExpenseItem, SplitMember } from "./types";
import { formatCurrency } from "./utils";

type ItemRowProps = {
  item: ExpenseItem;
  members: SplitMember[];
  onUpdateIncludedMemberIds: (includedMemberIds: string[]) => void;
  onRemove: () => void;
};

export function ItemRow({
  item,
  members,
  onUpdateIncludedMemberIds,
  onRemove,
}: ItemRowProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const includedMemberIds = useMemo(
    () => new Set(item.includedMemberIds),
    [item.includedMemberIds],
  );
  const selectedMembers = members.filter((member) =>
    includedMemberIds.has(member.id),
  );
  const memberCount = selectedMembers.length;
  const perPerson = memberCount > 0 ? item.amount / memberCount : 0;
  const everyoneSelected =
    members.length > 0 &&
    members.every((member) => includedMemberIds.has(member.id));

  const toggleMember = (memberId: string) => {
    const next = new Set(includedMemberIds);
    if (next.has(memberId)) {
      next.delete(memberId);
    } else {
      next.add(memberId);
    }
    onUpdateIncludedMemberIds([...next]);
  };

  const toggleEveryone = () => {
    if (everyoneSelected) {
      onUpdateIncludedMemberIds([]);
      return;
    }

    onUpdateIncludedMemberIds(members.map((member) => member.id));
  };

  return (
    <View className={isExpanded ? "bg-tally-primaryLight" : ""}>
      <Pressable
        onPress={() => setIsExpanded((current) => !current)}
        className="flex-row items-center gap-3 px-4 py-3.5 active:opacity-80"
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <View className="min-w-0 flex-1">
          <Text className="text-base font-bold text-tally-text">
            {item.name}
          </Text>
          <Text className="text-sm text-tally-textSecondary">
            split {memberCount} ways · {formatCurrency(perPerson)} each
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <OverlappingAvatars members={selectedMembers} />
          <Text className="text-base font-bold text-tally-text">
            {formatCurrency(item.amount)}
          </Text>
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#808080"
          />
        </View>
      </Pressable>

      {isExpanded ? (
        <>
          <View className="mx-4 overflow-hidden rounded-xl bg-white">
            <ItemSelectionRow
              label="Everyone"
              leading={
                <View className="h-10 w-10 items-center justify-center rounded-full bg-tally-background">
                  <Feather name="users" size={18} color="#808080" />
                </View>
              }
              included={everyoneSelected}
              onToggle={toggleEveryone}
            />

            {members.map((member, index) => (
              <ItemSelectionRow
                key={member.id}
                label={member.name}
                leading={
                  <Avatar
                    initial={member.initial}
                    backgroundColor={
                      member.avatarColor ??
                      MEMBER_AVATAR_COLORS[index % MEMBER_AVATAR_COLORS.length]
                    }
                    size={40}
                  />
                }
                included={includedMemberIds.has(member.id)}
                onToggle={() => toggleMember(member.id)}
                isLast={index === members.length - 1}
              />
            ))}
          </View>

          <Pressable
            onPress={onRemove}
            className="flex-row items-center justify-center gap-2 py-6 active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel="Remove item"
          >
            <Feather name="trash-2" size={18} color={REMOVE_ITEM_COLOR} />
            <Text
              className="text-sm font-semibold"
              style={{ color: REMOVE_ITEM_COLOR }}
            >
              Remove item
            </Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}
