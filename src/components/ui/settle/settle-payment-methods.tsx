import { Text, View } from "react-native";

import { TypeSelector } from "@/components/ui/type-selector";

const PAYMENT_METHODS = [
  { label: "Cash", icon: "attach-money" as const },
  { label: "PayPal", icon: "account-balance-wallet" as const },
  { label: "Bank", icon: "account-balance" as const },
  { label: "Others", icon: "edit-note" as const },
];

type SettlePaymentMethodsProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SettlePaymentMethods({
  value,
  onChange,
}: SettlePaymentMethodsProps) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
        HOW WAS IT PAID?
      </Text>
      <TypeSelector
        values={PAYMENT_METHODS}
        selected={value}
        onChange={onChange}
      />
    </View>
  );
}
