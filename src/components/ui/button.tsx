import { Pressable, Text, View } from "react-native";

type ButtonProps = {
  backgroundColor: string;
  text: string;
  textColor?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onPress?: () => void;
  className?: string;
};

export function Button({
  backgroundColor,
  text,
  textColor = "#FFFFFF",
  icon,
  iconPosition = "right",
  onPress,
  className = "",
}: ButtonProps) {
  const hasLeftIcon = icon && iconPosition === "left";

  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor }}
      className={`rounded-2xl px-4 py-4 active:opacity-90 ${className}`}
    >
      {hasLeftIcon ? (
        <View className="relative flex-row items-center justify-center">
          <View className="mr-2">{icon}</View>
          <Text style={{ color: textColor }} className="text-l font-semibold">
            {text}
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center justify-center">
          <Text style={{ color: textColor }} className="text-l font-semibold">
            {text}
          </Text>
          {icon && iconPosition === "right" ? (
            <View className="ml-2">{icon}</View>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}
