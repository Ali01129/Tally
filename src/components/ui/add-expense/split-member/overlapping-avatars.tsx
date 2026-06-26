import { View } from "react-native";

import { Avatar } from "@/components/ui/avatar";

import { MEMBER_AVATAR_COLORS } from "./constants";
import type { SplitMember } from "./types";

type OverlappingAvatarsProps = {
  members: SplitMember[];
  size?: number;
};

export function OverlappingAvatars({
  members,
  size = 28,
}: OverlappingAvatarsProps) {
  const overlap = Math.round(size * 0.35);

  return (
    <View className="flex-row items-center">
      {members.map((member, index) => (
        <View
          key={member.id}
          style={index > 0 ? { marginLeft: -overlap } : undefined}
          className="rounded-full border-2 border-white"
        >
          <Avatar
            initial={member.initial}
            backgroundColor={
              member.avatarColor ??
              MEMBER_AVATAR_COLORS[index % MEMBER_AVATAR_COLORS.length]
            }
            size={size}
          />
        </View>
      ))}
    </View>
  );
}
