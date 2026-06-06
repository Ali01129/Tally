import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { AmountInput } from "@/components/ui/add-expense/amount-input";
import { ExpenseAttachmentButtons } from "@/components/ui/add-expense/expense-attachment-buttons";
import { ExpenseDetailsCard } from "@/components/ui/add-expense/expense-details-card";
import { GroupSelector } from "@/components/ui/add-expense/group-selector";
import { SplitAssignmentStatus } from "@/components/ui/add-expense/split-assignment-status";
import {
  SplitMembersList,
  type SplitMember,
} from "@/components/ui/add-expense/split-members-list";
import {
  SplitSelector,
  type SplitMethod,
} from "@/components/ui/add-expense/split-selector";
import { CreateGroupHeader } from "@/components/ui/create-group/create-group-header";
import { useAddExpenseStore } from "@/stores/add-expense-store";

const GROUP_MEMBERS: SplitMember[] = [
  { id: "you", name: "You", initial: "M", avatarColor: "#D4C5F0" },
  { id: "1", name: "Jordan", initial: "J", avatarColor: "#C5D8F0" },
  { id: "2", name: "Priya", initial: "P", avatarColor: "#F0C5D8" },
  { id: "3", name: "Theo", initial: "T", avatarColor: "#F0E8C5" },
];

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("equal");
  const setTotalAmount = useAddExpenseStore((state) => state.setTotalAmount);
  const resetAddExpenseStore = useAddExpenseStore((state) => state.reset);
  const totalAmount = useAddExpenseStore((state) => state.totalAmount);
  const assignedAmount = useAddExpenseStore((state) => state.assignedAmount);

  useEffect(() => {
    const parsed = Number.parseFloat(amount);
    setTotalAmount(Number.isNaN(parsed) ? 0 : parsed);
  }, [amount, setTotalAmount]);

  useEffect(() => {
    return () => {
      resetAddExpenseStore();
    };
  }, [resetAddExpenseStore]);

  function disableSave(): boolean {
    const difference = Math.abs(totalAmount - assignedAmount);
    if (difference > 0.9 || description.length === 0 || totalAmount === 0) {
      return true;
    }
    return false;
  }

  function getTodayString(): string {
    const today = new Date();

    const month = today.toLocaleDateString("en-US", {
      month: "long",
    });

    const day = today.getDate();

    return `Today, ${month} ${day}`;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardAwareScrollView
          className="bg-tally-background"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={80}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 40,
            flexGrow: 1,
          }}
        >
          <View className="flex-1 gap-2 pt-2">
            <CreateGroupHeader
              title="Add expense"
              actionLabel="Save"
              createDisabled={disableSave()}
            />

            <GroupSelector groupName="Italy trip" initials="It" />

            <AmountInput amount={amount} onChangeAmount={setAmount} />

            <ExpenseDetailsCard
              description={description}
              onChangeDescription={setDescription}
              paidByLabel="You"
              dateLabel={getTodayString()}
            />

            <SplitSelector value={splitMethod} onChange={setSplitMethod} />

            <SplitMembersList
              splitMethod={splitMethod}
              totalAmount={amount}
              members={GROUP_MEMBERS}
            />

            <SplitAssignmentStatus />

            <ExpenseAttachmentButtons />
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
