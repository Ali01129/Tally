import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DateBottomSheet } from "@/components/ui/date-bottom-sheet";
import { SettleAmount } from "@/components/ui/settle/settle-amount";
import { SettleDetailsCard } from "@/components/ui/settle/settle-details-card";
import { SettleFooter } from "@/components/ui/settle/settle-footer";
import { SettleGroupBadge } from "@/components/ui/settle/settle-group-badge";
import { SettleHeader } from "@/components/ui/settle/settle-header";
import { SettlePayerList } from "@/components/ui/settle/settle-payer-list";
import { SettlePaymentMethods } from "@/components/ui/settle/settle-payment-methods";
import { SettleTransfer } from "@/components/ui/settle/settle-transfer";
import type { SettlePayer } from "@/components/ui/settle/types";
import { formatSettleDate } from "@/components/ui/settle/utils";
import { APP_USER, GROUP_DETAILS } from "@/data/app-data";

export default function SettleUpScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = GROUP_DETAILS[id ?? ""];

  const payers: SettlePayer[] = group
    ? group.memberBalances.flatMap((balance) => {
        if (balance.direction !== "you_owe") return [];

        const member = group.members.find(
          (item) => item.id === balance.memberId,
        );
        if (!member) return [];

        return [
          {
            id: member.id,
            name: member.name,
            initial: member.initial,
            avatarColor: member.avatarColor,
            amount: balance.amount,
            direction: balance.direction,
          },
        ];
      })
    : [];

  const [selectedPayerId, setSelectedPayerId] = useState(payers[0]?.id ?? "");
  const [paymentMethod, setPaymentMethod] = useState("Venmo");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [isDateSheetOpen, setIsDateSheetOpen] = useState(false);

  if (!group || payers.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-tally-background">
        <Text className="text-base text-tally-textSecondary">
          Nothing to settle
        </Text>
      </View>
    );
  }

  const selectedPayer =
    payers.find((payer) => payer.id === selectedPayerId) ?? payers[0];
  const totalYouOwe = payers.reduce((sum, payer) => sum + payer.amount, 0);
  const paymentAmount = selectedPayer.amount;
  const remainingWithPayer = 0;
  const remainingInGroup = Math.max(0, totalYouOwe - paymentAmount);

  function handleSelectPayer(payerId: string) {
    setSelectedPayerId(payerId);
  }

  return (
    <View className="flex-1 bg-tally-background">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View className="gap-5 px-6 pt-2">
              <View className="gap-3">
                <SettleHeader />
                <SettleGroupBadge
                  name={group.name}
                  initials={group.initials}
                  balanceStatus="owe"
                  totalAmount={totalYouOwe}
                />
              </View>

              <View className="gap-2">
                <SettleTransfer
                  payer={selectedPayer}
                  currentUser={{
                    name: APP_USER.displayName,
                    initial: APP_USER.initial,
                    avatarColor: APP_USER.avatarColor,
                  }}
                />
                <SettleAmount amount={selectedPayer.amount} />
              </View>

              <SettlePayerList
                heading="WHO ARE YOU PAYING?"
                payers={payers}
                selectedPayerId={selectedPayer.id}
                onSelect={handleSelectPayer}
              />

              <SettlePaymentMethods
                value={paymentMethod}
                onChange={setPaymentMethod}
              />

              <SettleDetailsCard
                note={note}
                onChangeNote={setNote}
                dateLabel={formatSettleDate(selectedDate)}
                onPressDate={() => setIsDateSheetOpen(true)}
              />

              <SettleFooter
                paymentAmount={paymentAmount}
                payerName={selectedPayer.name}
                remainingWithPayer={remainingWithPayer}
                remainingInGroup={remainingInGroup}
                groupName={group.name}
                balanceStatus="owe"
                showReminder={false}
                onRecord={() => router.back()}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <DateBottomSheet
        isPresented={isDateSheetOpen}
        onDismiss={() => setIsDateSheetOpen(false)}
        heading="Choose date"
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
    </View>
  );
}
