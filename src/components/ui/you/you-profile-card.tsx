import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { YouProfileStats } from "@/components/ui/you/you-profile-stats";

type YouProfileCardProps = {
  name: string;
  email: string;
  handle: string;
  initial: string;
  avatarColor?: string;
  verified?: boolean;
  groupsCount: number;
  friendsCount: number;
  netBalance: string;
  onEditProfile?: () => void;
};

export function YouProfileCard({
  name,
  email,
  handle,
  initial,
  avatarColor = "#D4C5F0",
  verified = true,
  groupsCount,
  friendsCount,
  netBalance,
  onEditProfile,
}: YouProfileCardProps) {
  return (
    <View className="relative overflow-hidden rounded-3xl bg-white p-5">
      <View className="absolute -right-8 -top-12 h-40 w-40 rounded-full bg-[#E8DFF8]" />

      <View className="flex-row items-center gap-3.5">
        <Avatar initial={initial} backgroundColor={avatarColor} size={58} />

        <View className="min-w-0 flex-1">
          <Text className="text-xl font-bold text-tally-text" numberOfLines={1}>
            {name}
          </Text>
          <Text
            className="mt-0.5 text-sm text-tally-textSecondary"
            numberOfLines={1}
          >
            {email}
          </Text>

          <View className="mt-2 flex-row items-center gap-1.5">
            {verified ? (
              <>
                <View className="h-4 w-4 items-center justify-center rounded-full bg-[#34C759]">
                  <Feather name="check" size={10} color="#FFFFFF" />
                </View>
                <Text className="text-sm text-tally-textSecondary">
                  Verified
                </Text>
                <Text className="text-sm text-tally-textSecondary">·</Text>
              </>
            ) : null}
            <Text className="text-sm text-tally-textSecondary">{handle}</Text>
          </View>
        </View>
      </View>

      <View className="my-5">
        <YouProfileStats
          stats={[
            { value: String(groupsCount), label: "Groups" },
            { value: String(friendsCount), label: "Friends" },
            { value: netBalance, label: "Net balance" },
          ]}
        />
      </View>

      <Button
        backgroundColor="#F0EEEC"
        text="Edit profile"
        textColor="#000000"
        icon={<Feather name="edit-2" size={16} color="#000000" />}
        iconPosition="left"
        onPress={onEditProfile}
        className="py-3.5"
      />
    </View>
  );
}
