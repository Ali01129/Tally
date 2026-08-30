import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Avatar } from "@/components/ui/avatar";
import { Colors } from "@/constants/theme";

import type { SettleCurrentUser, SettlePayer } from "./types";

type SettleTransferProps = {
  payer: SettlePayer;
  currentUser: SettleCurrentUser;
};

export function SettleTransfer({ payer, currentUser }: SettleTransferProps) {
  const payerIsCurrentUser = payer.direction === "you_owe";

  const from = payerIsCurrentUser
    ? {
        name: "You",
        initial: currentUser.initial,
        avatarColor: currentUser.avatarColor,
      }
    : {
        name: payer.name,
        initial: payer.initial,
        avatarColor: payer.avatarColor,
      };

  const to = payerIsCurrentUser
    ? {
        name: payer.name,
        initial: payer.initial,
        avatarColor: payer.avatarColor,
      }
    : {
        name: "You",
        initial: currentUser.initial,
        avatarColor: currentUser.avatarColor,
      };

  return (
    <View className="flex-row items-center justify-center gap-6 py-2">
      <View className="items-center gap-2">
        <Avatar
          initial={from.initial}
          backgroundColor={from.avatarColor}
          size={64}
        />
        <Text className="text-sm font-semibold text-tally-text">
          {from.name}
        </Text>
      </View>

      <View className="items-center">
        <Text className="text-[10px] font-semibold tracking-widest text-tally-textSecondary">
          PAYS
        </Text>
        <Feather
          name="arrow-right"
          size={18}
          color={Colors.tally.textSecondary}
        />
      </View>

      <View className="items-center gap-2">
        <Avatar
          initial={to.initial}
          backgroundColor={to.avatarColor}
          size={64}
        />
        <Text className="text-sm font-semibold text-tally-text">
          {to.name}
        </Text>
      </View>
    </View>
  );
}
