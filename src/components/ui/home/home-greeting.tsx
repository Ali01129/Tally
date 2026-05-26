import { Text, View } from "react-native";

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type HomeGreetingProps = {
  userName?: string;
};

export function HomeGreeting({ userName = "Maya" }: HomeGreetingProps) {
  const greeting = getTimeGreeting();
  const dateLabel = formatDate(new Date());

  return (
    <View className="gap-1">
      <Text className="text-sm text-tally-textSecondary">{dateLabel}</Text>
      <Text className="text-3xl font-bold text-tally-text">
        {greeting}, {userName}.
      </Text>
    </View>
  );
}
