import { Text, View } from "react-native";

const PARTICIPANT_COLORS = [
  "#E8D4F0",
  "#D4E8F0",
  "#F0E8D4",
  "#E8F0D4",
  "#F0D4E8",
];

export type GroupBalanceStatus = "owed" | "owe" | "settled";

export type HomeGroupItemData = {
  id: string;
  name: string;
  initials: string;
  participants: string[];
  totalParticipants: number;
  status: GroupBalanceStatus;
  amount?: number;
};

type HomeGroupItemProps = {
  group: HomeGroupItemData;
  isLast?: boolean;
};

function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function getStatusLabel(status: GroupBalanceStatus): string {
  switch (status) {
    case "owed":
      return "you're owed";
    case "owe":
      return "you owe";
    case "settled":
      return "Settled";
  }
}

export function HomeGroupItem({ group, isLast = false }: HomeGroupItemProps) {
  const { name, initials, participants, totalParticipants, status, amount } =
    group;

  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-4 ${
        !isLast ? "border-b border-black/5" : ""
      }`}
    >
      <View className="relative h-[12vw] w-[12vw] items-center justify-center overflow-hidden rounded-2xl bg-tally-groupBg">
        <View className="absolute right-3 top-3 h-[10vw] w-[10vw] translate-x-1/2 -translate-y-1/2 rounded-full bg-tally-groupCircles" />
        <View className="absolute bottom-2 left-2 h-[7vw] w-[7vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-tally-groupCircles" />
        <Text className="text-sm font-bold text-tally-text">{initials}</Text>
      </View>

      <View className="min-w-0 flex-1 gap-1.5">
        <Text className="text-base font-bold text-tally-text" numberOfLines={1}>
          {name}
        </Text>
        <View className="flex-row items-center">
          {participants.map((participant, index) => (
            <View
              key={`${group.id}-${index}`}
              style={{
                backgroundColor:
                  PARTICIPANT_COLORS[index % PARTICIPANT_COLORS.length],
                marginLeft: index > 0 ? -8 : 0,
                zIndex: participants.length - index,
              }}
              className="h-[6vw] w-[6vw] items-center justify-center rounded-full border border-tally-groupBg"
            >
              <Text className="text-sm font-semibold text-tally-text">
                {participant}
              </Text>
            </View>
          ))}
          <Text className="ml-2 text-xs text-tally-textSecondary">
            {totalParticipants}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-xs text-tally-textSecondary">
          {getStatusLabel(status)}
        </Text>
        {status === "settled" ? (
          <Text className="mt-0.5 text-lg font-bold text-tally-textSecondary">
            —
          </Text>
        ) : (
          <Text
            className={`mt-0.5 text-lg font-bold ${
              status === "owed" ? "text-tally-green" : "text-tally-red"
            }`}
          >
            {amount != null ? formatAmount(amount) : "—"}
          </Text>
        )}
      </View>
    </View>
  );
}
