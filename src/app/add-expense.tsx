import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AmountInput } from "@/components/ui/add-expense/amount-input";
import { ExpenseDetailsCard } from "@/components/ui/add-expense/expense-details-card";
import { GroupSelector } from "@/components/ui/add-expense/group-selector";
import { SplitSelector } from "@/components/ui/add-expense/split-selector";
import { CreateGroupHeader } from "@/components/ui/create-group/create-group-header";

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState("0.00");
  const [description, setDescription] = useState("");

  return (
    <ScrollView
      className="flex-1 bg-tally-background"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView className="flex-1 px-6">
        <View className="flex-1 gap-2 pt-2">
          <CreateGroupHeader title="Add expense" actionLabel="Save" />

          <GroupSelector groupName="Italy trip" initials="It" />

          <AmountInput amount={amount} onChangeAmount={setAmount} />

          <ExpenseDetailsCard
            description={description}
            onChangeDescription={setDescription}
            paidByLabel="You"
            dateLabel="Today, May 24"
          />

          <SplitSelector />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
