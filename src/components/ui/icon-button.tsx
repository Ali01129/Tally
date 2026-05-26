import { Pressable, View } from "react-native";

type IconButtonProps = {
  icon: React.ReactNode;
  onPress?: () => void;
  showBadge?: boolean;
  className?: string;
};

export function IconButton({
  icon,
  onPress,
  showBadge = false,
  className = "",
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm active:opacity-80 ${className}`}
    >
      {icon}
      {showBadge ? (
        <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
      ) : null}
    </Pressable>
  );
}
