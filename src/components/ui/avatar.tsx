import { Text, View } from "react-native";

type AvatarProps = {
  initial: string;
  backgroundColor?: string;
  size?: number;
  className?: string;
};

export function Avatar({
  initial,
  backgroundColor = "#D4C5F0",
  size = 44,
  className = "",
}: AvatarProps) {
  return (
    <View
      style={{ width: size, height: size, backgroundColor }}
      className={`items-center justify-center rounded-full ${className}`}
    >
      <Text
        style={{ fontSize: Math.round(size * 0.4) }}
        className="font-bold text-tally-primary"
      >
        {initial}
      </Text>
    </View>
  );
}
