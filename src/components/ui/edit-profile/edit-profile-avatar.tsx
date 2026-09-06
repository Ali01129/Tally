import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { Colors } from "@/constants/theme";

const AVATAR_COLORS = [
  Colors.tally.primaryLight,
  "#D4C5F0",
  Colors.tally.green,
  Colors.tally.red,
  Colors.tally.groupBg,
  Colors.tally.textOnPrimary,
] as const;

type EditProfileAvatarProps = {
  name: string;
  displayName: string;
  initial: string;
  avatarColor: string;
  verified?: boolean;
  onChangeColor: (color: string) => void;
};

export function EditProfileAvatar({
  name,
  displayName,
  initial,
  avatarColor,
  verified = true,
  onChangeColor,
}: EditProfileAvatarProps) {
  return (
    <View className="relative overflow-hidden rounded-3xl bg-white p-5">
      <View className="absolute -right-10 -top-14 h-44 w-44 rounded-full bg-tally-primaryLight" />
      <View className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-tally-groupBg" />

      <View className="items-center gap-3">
        <Avatar initial={initial} backgroundColor={avatarColor} size={104} />

        <View className="items-center gap-1">
          <Text className="text-xl font-bold text-tally-text" numberOfLines={1}>
            {displayName || name || "Your name"}
          </Text>
          <Text
            className="text-sm text-tally-textSecondary"
            numberOfLines={1}
          >
            {name || "Full name"}
          </Text>

          {verified ? (
            <View className="mt-1 flex-row items-center gap-1.5">
              <View className="h-4 w-4 items-center justify-center rounded-full bg-[#34C759]">
                <Feather name="check" size={10} color="#FFFFFF" />
              </View>
              <Text className="text-sm text-tally-textSecondary">Verified</Text>
            </View>
          ) : null}
        </View>

        <View className="mt-2 w-full gap-2.5">
          <Text className="text-center text-xs font-semibold tracking-wider text-tally-textSecondary">
            AVATAR COLOR
          </Text>
          <View className="flex-row flex-wrap justify-center gap-2.5">
            {AVATAR_COLORS.map((color) => {
              const selected = color === avatarColor;

              return (
                <Pressable
                  key={color}
                  onPress={() => onChangeColor(color)}
                  style={{ backgroundColor: color }}
                  className={`h-10 w-10 items-center justify-center rounded-full ${
                    selected ? "border-2 border-tally-primary" : ""
                  }`}
                >
                  {selected ? (
                    <Feather
                      name="check"
                      size={14}
                      color={Colors.tally.primary}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
