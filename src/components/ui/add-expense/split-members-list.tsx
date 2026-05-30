import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import type { SplitMethod } from "@/components/ui/add-expense/split-selector";
import { Avatar } from "@/components/ui/avatar";

const MEMBER_AVATAR_COLORS = ["#D4C5F0", "#C5D8F0", "#F0C5D8", "#F0E8C5"];

export type SplitMember = {
  id: string;
  name: string;
  initial: string;
  avatarColor?: string;
};

type SplitMembersListProps = {
  splitMethod: SplitMethod;
  totalAmount: string;
  members: SplitMember[];
};

function sanitizeDecimalInput(text: string): string {
  const cleaned = text.replace(/[^0-9.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  const fraction = rest.join("").slice(0, 2);

  if (rest.length === 0) {
    return whole;
  }

  return `${whole}.${fraction}`;
}

function sanitizePercentInput(text: string): string {
  return text.replace(/[^0-9]/g, "");
}

function clampDecimalInput(value: string, max: number): string {
  const sanitized = sanitizeDecimalInput(value);

  if (!sanitized) {
    return "";
  }

  if (sanitized === ".") {
    return sanitized;
  }

  const hasTrailingDot = sanitized.endsWith(".");
  const parsed = Number.parseFloat(sanitized);

  if (Number.isNaN(parsed)) {
    return "";
  }

  if (parsed > max) {
    return max.toFixed(2);
  }

  if (hasTrailingDot && sanitized.indexOf(".") === sanitized.length - 1) {
    return sanitized;
  }

  return sanitized;
}

function clampPercentInput(value: string): string {
  if (!value) {
    return "";
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    return "";
  }

  return String(Math.min(100, Math.max(0, parsed)));
}

function formatCurrency(amount: number): string {
  if (Number.isNaN(amount)) {
    return "$0.00";
  }

  return `$${amount.toFixed(2)}`;
}

function redistributeSplitAmounts(
  members: SplitMember[],
  includedMemberIds: Set<string>,
  totalAmount: number,
): {
  exactAmounts: Record<string, string>;
  percentAmounts: Record<string, string>;
} {
  const includedCount = members.filter((member) =>
    includedMemberIds.has(member.id),
  ).length;
  const share =
    includedCount > 0 ? (totalAmount / includedCount).toFixed(2) : "0.00";
  const percent =
    includedCount > 0 ? String(Math.floor(100 / includedCount)) : "0";

  return {
    exactAmounts: Object.fromEntries(
      members.map((member) => [
        member.id,
        includedMemberIds.has(member.id) ? share : "",
      ]),
    ),
    percentAmounts: Object.fromEntries(
      members.map((member) => [
        member.id,
        includedMemberIds.has(member.id) ? percent : "",
      ]),
    ),
  };
}

function getMemberShareLabel(
  splitMethod: SplitMethod,
  isIncluded: boolean,
  totalAmount: number,
  includedCount: number,
  exactValue: string,
  percentValue: string,
): string {
  if (!isIncluded) {
    return "Not included";
  }

  if (splitMethod === "equal") {
    if (includedCount === 0) {
      return `${formatCurrency(0)} per person`;
    }

    return `${formatCurrency(totalAmount / includedCount)} per person`;
  }

  if (splitMethod === "exact") {
    const parsed = Number.parseFloat(exactValue);
    const amount = Number.isNaN(parsed) ? 0 : parsed;
    return `${formatCurrency(amount)} per person`;
  }

  if (splitMethod === "percent") {
    const parsed = Number.parseInt(percentValue, 10);
    const percent = Number.isNaN(parsed) ? 0 : parsed;
    return `${formatCurrency((percent / 100) * totalAmount)} per person`;
  }

  return "";
}

function CheckIndicator({
  included,
  onPress,
}: {
  included: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="active:opacity-80"
      accessibilityRole="checkbox"
      accessibilityState={{ checked: included }}
    >
      {included ? (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-tally-primary">
          <Feather name="check" size={14} color="#ffffff" />
        </View>
      ) : (
        <View className="h-7 w-7 rounded-full border-2 border-tally-textSecondary" />
      )}
    </Pressable>
  );
}

function ExactAmountInput({
  value,
  maxAmount,
  onChange,
  disabled,
}: {
  value: string;
  maxAmount: number;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center rounded-xl bg-tally-background px-3 py-2 ${
        disabled ? "opacity-40" : ""
      }`}
    >
      <Text className="text-sm font-semibold text-tally-textSecondary">$</Text>
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={(text) => {
          onChange(clampDecimalInput(sanitizeDecimalInput(text), maxAmount));
        }}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor="#808080"
        className="min-w-[56px] p-0 text-right text-sm font-semibold text-tally-text"
      />
    </View>
  );
}

function PercentAmountInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center rounded-xl bg-tally-background px-3 py-2 ${
        disabled ? "opacity-40" : ""
      }`}
    >
      <Text className="text-sm font-semibold text-tally-textSecondary">%</Text>
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={(text) => {
          onChange(clampPercentInput(sanitizePercentInput(text)));
        }}
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor="#808080"
        className="min-w-[56px] p-0 text-right text-sm font-semibold text-tally-text"
      />
    </View>
  );
}

const ADD_ITEM_COLOR = "#3A73AE";

type ExpenseItem = {
  id: string;
  name: string;
  amount: number;
  includedMemberIds: string[];
};

const REMOVE_ITEM_COLOR = "#DC2626";

function OverlappingAvatars({
  members,
  size = 28,
}: {
  members: SplitMember[];
  size?: number;
}) {
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

function ItemSelectionRow({
  label,
  leading,
  included,
  onToggle,
  isLast,
}: {
  label: string;
  leading: ReactNode;
  included: boolean;
  onToggle: () => void;
  isLast?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3.5 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      {leading}
      <Text className="min-w-0 flex-1 text-base font-bold text-tally-text">
        {label}
      </Text>
      <CheckIndicator included={included} onPress={onToggle} />
    </View>
  );
}

function ItemRow({
  item,
  members,
  onUpdateIncludedMemberIds,
  onRemove,
}: {
  item: ExpenseItem;
  members: SplitMember[];
  onUpdateIncludedMemberIds: (includedMemberIds: string[]) => void;
  onRemove: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const includedMemberIds = useMemo(
    () => new Set(item.includedMemberIds),
    [item.includedMemberIds],
  );
  const selectedMembers = members.filter((member) =>
    includedMemberIds.has(member.id),
  );
  const memberCount = selectedMembers.length;
  const perPerson = memberCount > 0 ? item.amount / memberCount : 0;
  const everyoneSelected =
    members.length > 0 &&
    members.every((member) => includedMemberIds.has(member.id));

  const toggleMember = (memberId: string) => {
    const next = new Set(includedMemberIds);
    if (next.has(memberId)) {
      next.delete(memberId);
    } else {
      next.add(memberId);
    }
    onUpdateIncludedMemberIds([...next]);
  };

  const toggleEveryone = () => {
    if (everyoneSelected) {
      onUpdateIncludedMemberIds([]);
      return;
    }

    onUpdateIncludedMemberIds(members.map((member) => member.id));
  };

  return (
    <View className={isExpanded ? "bg-tally-primaryLight" : ""}>
      <Pressable
        onPress={() => setIsExpanded((current) => !current)}
        className="flex-row items-center gap-3 px-4 py-3.5 active:opacity-80"
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <View className="min-w-0 flex-1">
          <Text className="text-base font-bold text-tally-text">{item.name}</Text>
          <Text className="text-sm text-tally-textSecondary">
            split {memberCount} ways · {formatCurrency(perPerson)} each
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <OverlappingAvatars members={selectedMembers} />
          <Text className="text-base font-bold text-tally-text">
            {formatCurrency(item.amount)}
          </Text>
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#808080"
          />
        </View>
      </Pressable>

      {isExpanded ? (
        <>
          <View className="mx-4 mb-3 overflow-hidden rounded-xl bg-white">
          <ItemSelectionRow
            label="Everyone"
            leading={
              <View className="h-10 w-10 items-center justify-center rounded-full bg-tally-background">
                <Feather name="users" size={18} color="#808080" />
              </View>
            }
            included={everyoneSelected}
            onToggle={toggleEveryone}
          />

          {members.map((member, index) => (
            <ItemSelectionRow
              key={member.id}
              label={member.name}
              leading={
                <Avatar
                  initial={member.initial}
                  backgroundColor={
                    member.avatarColor ??
                    MEMBER_AVATAR_COLORS[index % MEMBER_AVATAR_COLORS.length]
                  }
                  size={40}
                />
              }
              included={includedMemberIds.has(member.id)}
              onToggle={() => toggleMember(member.id)}
              isLast={index === members.length - 1}
            />
          ))}
        </View>

        <Pressable
          onPress={onRemove}
          className="flex-row items-center justify-center gap-2 py-3.5 active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel="Remove item"
        >
          <Feather name="trash-2" size={18} color={REMOVE_ITEM_COLOR} />
          <Text
            className="text-sm font-semibold"
            style={{ color: REMOVE_ITEM_COLOR }}
          >
            Remove item
          </Text>
        </Pressable>
        </>
      ) : null}
    </View>
  );
}

function AddItemButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-2 px-4 py-3.5 active:opacity-80"
      accessibilityRole="button"
      accessibilityLabel="Add item"
    >
      <Feather name="plus" size={20} color={ADD_ITEM_COLOR} />
      <Text
        className="text-base font-semibold"
        style={{ color: ADD_ITEM_COLOR }}
      >
        Add item
      </Text>
    </Pressable>
  );
}

function isAddItemFormValid(itemName: string, amount: string): boolean {
  const trimmedName = itemName.trim();
  if (!trimmedName) {
    return false;
  }

  const parsed = Number.parseFloat(amount);
  return !Number.isNaN(parsed) && parsed > 0;
}

function AddItemForm({
  maxAmount,
  onCancel,
  onAdd,
}: {
  maxAmount: number;
  onCancel: () => void;
  onAdd: (name: string, amount: string) => void;
}) {
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const canAdd = isAddItemFormValid(itemName, amount);

  return (
    <View className="gap-3 p-4">
      <View className="flex-row items-center gap-2">
        <View className="min-w-0 flex-1 rounded-xl bg-tally-background px-3 py-2">
          <TextInput
            value={itemName}
            onChangeText={setItemName}
            placeholder="Item name"
            placeholderTextColor="#808080"
            className="p-0 text-sm font-semibold text-tally-text"
          />
        </View>
        <ExactAmountInput
          value={amount}
          maxAmount={maxAmount}
          onChange={setAmount}
        />
      </View>

      <View className="flex-row items-center justify-end gap-2">
        <Pressable
          onPress={onCancel}
          className="rounded-xl border border-black/10 bg-white px-4 py-2.5 active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel="Cancel"
        >
          <Text className="text-sm font-semibold text-tally-text">Cancel</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (!canAdd) {
              return;
            }
            onAdd(itemName.trim(), amount);
          }}
          disabled={!canAdd}
          className={`rounded-xl px-4 py-2.5 ${
            canAdd
              ? "bg-tally-primary active:opacity-80"
              : "bg-tally-textSecondary"
          }`}
          accessibilityRole="button"
          accessibilityLabel="Add item"
          accessibilityState={{ disabled: !canAdd }}
        >
          <Text className="text-sm font-semibold text-white">Add item</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MemberRow({
  member,
  index,
  splitMethod,
  shareLabel,
  exactValue,
  percentValue,
  maxAmount,
  isIncluded,
  onToggleIncluded,
  onExactChange,
  onPercentChange,
  isLast,
}: {
  member: SplitMember;
  index: number;
  splitMethod: SplitMethod;
  shareLabel: string;
  exactValue: string;
  percentValue: string;
  maxAmount: number;
  isIncluded: boolean;
  onToggleIncluded: () => void;
  onExactChange: (value: string) => void;
  onPercentChange: (value: string) => void;
  isLast: boolean;
}) {
  const showSubtitle =
    splitMethod === "equal" ||
    splitMethod === "exact" ||
    splitMethod === "percent";

  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-3.5 ${
        !isLast ? "border-b border-black/5" : ""
      } ${!isIncluded ? "opacity-50" : ""}`}
    >
      <Avatar
        initial={member.initial}
        backgroundColor={
          member.avatarColor ??
          MEMBER_AVATAR_COLORS[index % MEMBER_AVATAR_COLORS.length]
        }
        size={40}
      />

      <View className="min-w-0 flex-1">
        <Text
          className={`text-base font-bold ${
            isIncluded ? "text-tally-text" : "text-tally-textSecondary"
          }`}
        >
          {member.name}
        </Text>
        {showSubtitle ? (
          <Text className="text-sm text-tally-textSecondary">{shareLabel}</Text>
        ) : null}
      </View>

      {splitMethod === "equal" ? (
        <CheckIndicator included={isIncluded} onPress={onToggleIncluded} />
      ) : null}
      {splitMethod === "exact" ? (
        <>
          <ExactAmountInput
            value={exactValue}
            maxAmount={maxAmount}
            onChange={onExactChange}
            disabled={!isIncluded}
          />
          <CheckIndicator included={isIncluded} onPress={onToggleIncluded} />
        </>
      ) : null}
      {splitMethod === "percent" ? (
        <>
          <PercentAmountInput
            value={percentValue}
            onChange={onPercentChange}
            disabled={!isIncluded}
          />
          <CheckIndicator included={isIncluded} onPress={onToggleIncluded} />
        </>
      ) : null}
    </View>
  );
}

export function SplitMembersList({
  splitMethod,
  totalAmount,
  members,
}: SplitMembersListProps) {
  const maxAmount = useMemo(() => {
    const parsed = Number.parseFloat(totalAmount);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, [totalAmount]);

  const [exactAmounts, setExactAmounts] = useState<Record<string, string>>({});
  const [percentAmounts, setPercentAmounts] = useState<Record<string, string>>(
    {},
  );
  const [includedMemberIds, setIncludedMemberIds] = useState<Set<string>>(
    () => new Set(members.map((member) => member.id)),
  );

  const includedCount = useMemo(
    () => members.filter((member) => includedMemberIds.has(member.id)).length,
    [members, includedMemberIds],
  );

  useEffect(() => {
    setIncludedMemberIds(new Set(members.map((member) => member.id)));
  }, [members]);

  useEffect(() => {
    const {
      exactAmounts: nextExactAmounts,
      percentAmounts: nextPercentAmounts,
    } = redistributeSplitAmounts(members, includedMemberIds, maxAmount);

    setExactAmounts(nextExactAmounts);
    setPercentAmounts(nextPercentAmounts);
  }, [members, maxAmount, includedMemberIds]);

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [items, setItems] = useState<ExpenseItem[]>([]);

  useEffect(() => {
    if (splitMethod !== "by-items") {
      setItems([]);
      setIsAddingItem(false);
    }
  }, [splitMethod]);

  if (splitMethod === "by-items") {
    return (
      <View className="mt-2 overflow-hidden rounded-2xl bg-white">
        {items.map((item) => (
          <View key={item.id}>
            <ItemRow
              item={item}
              members={members}
              onUpdateIncludedMemberIds={(includedMemberIds) =>
                setItems((current) =>
                  current.map((currentItem) =>
                    currentItem.id === item.id
                      ? { ...currentItem, includedMemberIds }
                      : currentItem,
                  ),
                )
              }
              onRemove={() =>
                setItems((current) =>
                  current.filter((currentItem) => currentItem.id !== item.id),
                )
              }
            />
            <View className="border-b border-black/5" />
          </View>
        ))}

        {isAddingItem ? (
          <>
            <AddItemForm
              maxAmount={maxAmount}
              onCancel={() => setIsAddingItem(false)}
              onAdd={(name, amountStr) => {
                const parsed = Number.parseFloat(amountStr);
                if (Number.isNaN(parsed) || parsed <= 0) {
                  return;
                }
                setItems((current) => [
                  ...current,
                  {
                    id: `${Date.now()}-${current.length}`,
                    name,
                    amount: parsed,
                    includedMemberIds: members.map((member) => member.id),
                  },
                ]);
                setIsAddingItem(false);
              }}
            />
            <View className="border-b border-black/5" />
          </>
        ) : null}

        <AddItemButton
          onPress={() => {
            if (!isAddingItem) {
              setIsAddingItem(true);
            }
          }}
        />
      </View>
    );
  }

  return (
    <View className="mt-2 overflow-hidden rounded-2xl bg-white">
      {members.map((member, index) => {
        const isIncluded = includedMemberIds.has(member.id);
        const shareLabel = getMemberShareLabel(
          splitMethod,
          isIncluded,
          maxAmount,
          includedCount,
          exactAmounts[member.id] ?? "",
          percentAmounts[member.id] ?? "",
        );

        return (
          <MemberRow
            key={member.id}
            member={member}
            index={index}
            splitMethod={splitMethod}
            shareLabel={shareLabel}
            exactValue={exactAmounts[member.id] ?? ""}
            percentValue={percentAmounts[member.id] ?? ""}
            maxAmount={maxAmount}
            isIncluded={isIncluded}
            onToggleIncluded={() =>
              setIncludedMemberIds((current) => {
                const next = new Set(current);
                if (next.has(member.id)) {
                  next.delete(member.id);
                } else {
                  next.add(member.id);
                }
                return next;
              })
            }
            onExactChange={(value) =>
              setExactAmounts((current) => ({ ...current, [member.id]: value }))
            }
            onPercentChange={(value) =>
              setPercentAmounts((current) => ({
                ...current,
                [member.id]: value,
              }))
            }
            isLast={index === members.length - 1}
          />
        );
      })}
    </View>
  );
}
