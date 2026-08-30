import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";

import { formatAmount } from "./utils";

type SettleFooterProps = {
  paymentAmount: number;
  payerName: string;
  remainingWithPayer: number;
  remainingInGroup: number;
  groupName: string;
  balanceStatus: "owed" | "owe";
  showReminder: boolean;
  onRecord: () => void;
  onRemind?: () => void;
};

export function SettleFooter({
  paymentAmount,
  payerName,
  remainingWithPayer,
  remainingInGroup,
  groupName,
  balanceStatus,
  showReminder,
  onRecord,
  onRemind,
}: SettleFooterProps) {
  const isDisabled = paymentAmount <= 0;
  const groupRemainderLabel =
    balanceStatus === "owed" ? "you'll be owed" : "you'll owe";
  const personBalanceLabel =
    balanceStatus === "owed"
      ? `${payerName}'s balance with you`
      : `your balance with ${payerName}`;

  return (
    <View className="gap-4">
      <Pressable
        onPress={onRecord}
        disabled={isDisabled}
        className={`flex-row items-center justify-center gap-2 rounded-full bg-tally-primary py-4 active:opacity-90 ${
          isDisabled ? "opacity-40" : ""
        }`}
      >
        <FontAwesome5
          name="handshake"
          size={16}
          color={Colors.light.background}
        />
        <Text className="text-base font-bold text-white">
          Record {formatAmount(paymentAmount)} payment
        </Text>
      </Pressable>

      {showReminder ? (
        <Pressable
          onPress={onRemind}
          className="flex-row items-center justify-center gap-2 active:opacity-70"
        >
          <MaterialIcons
            name="campaign"
            size={18}
            color={Colors.tally.primary}
          />
          <Text className="text-sm font-semibold text-tally-primary">
            Send {payerName} a reminder instead
          </Text>
        </Pressable>
      ) : null}

      <Text className="px-2 text-center text-xs leading-5 text-tally-textSecondary">
        After this, {personBalanceLabel} will be{" "}
        <Text className="font-bold text-tally-text">
          {formatAmount(remainingWithPayer)}
        </Text>{" "}
        and {groupRemainderLabel}{" "}
        <Text className="font-bold text-tally-text">
          {formatAmount(remainingInGroup)}
        </Text>{" "}
        in {groupName}.
      </Text>
    </View>
  );
}
