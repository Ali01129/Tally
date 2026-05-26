import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
import { Text, TextInput, View } from "react-native";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

function DetailIcon({ name }: { name: IconName }) {
  return (
    <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#F7F5F3]">
      <MaterialIcons name={name} size={18} color="#808080" />
    </View>
  );
}

type ExpenseDetailsCardProps = {
  description: string;
  onChangeDescription: (value: string) => void;
  paidByLabel: string;
  dateLabel: string;
};

function DetailRow({
  icon,
  label,
  isLast,
  showChevron = true,
  children,
}: {
  icon: IconName;
  label: string;
  isLast?: boolean;
  showChevron?: boolean;
  children?: ReactNode;
}) {
  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-4 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      <DetailIcon name={icon} />
      <View className="min-w-0 flex-1 flex-row items-center justify-between">
        <View className="min-w-0 flex-1 gap-1">
          <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
            {label}
          </Text>
          {children}
        </View>
        {showChevron ? (
          <MaterialIcons name="chevron-right" size={22} color="#808080" />
        ) : null}
      </View>
    </View>
  );
}

export function ExpenseDetailsCard({
  description,
  onChangeDescription,
  paidByLabel,
  dateLabel,
}: ExpenseDetailsCardProps) {
  return (
    <View className="mt-2 overflow-hidden rounded-2xl bg-white">
      <DetailRow icon="payments" label="DESCRIPTION" showChevron={false}>
        <TextInput
          value={description}
          onChangeText={onChangeDescription}
          placeholder="Add description"
          placeholderTextColor="#808080"
          multiline={false}
          numberOfLines={1}
          className="p-0 text-md font-semibold leading-6 text-tally-text"
        />
      </DetailRow>

      <DetailRow icon="account-balance-wallet" label="PAID BY">
        <Text className="text-md font-semibold leading-6 text-tally-text">{paidByLabel}</Text>
      </DetailRow>

      <DetailRow icon="calendar-today" label="DATE" isLast>
        <Text className="text-md font-semibold leading-6 text-tally-text">{dateLabel}</Text>
      </DetailRow>
    </View>
  );
}
