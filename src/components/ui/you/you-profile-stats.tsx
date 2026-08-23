import { Text, View } from "react-native";

type ProfileStat = {
  value: string;
  label: string;
};

type YouProfileStatsProps = {
  stats: ProfileStat[];
};

export function YouProfileStats({ stats }: YouProfileStatsProps) {
  return (
    <View className="flex-row">
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          className={`flex-1 items-center ${
            index < stats.length - 1 ? "border-r border-black/5" : ""
          }`}
        >
          <Text className="text-2xl font-bold text-tally-text">{stat.value}</Text>
          <Text className="mt-1 text-sm text-tally-textSecondary">
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
