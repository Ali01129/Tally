import { Text, View } from "react-native";

import {
  YouMenuItem,
  type YouMenuItemData,
} from "@/components/ui/you/you-menu-item";

type YouMenuSectionProps = {
  title?: string;
  items: YouMenuItemData[];
  onItemPress?: (itemId: string) => void;
};

export function YouMenuSection({
  title,
  items,
  onItemPress,
}: YouMenuSectionProps) {
  return (
    <View className="gap-2">
      {title ? (
        <Text className="px-1 text-xs font-semibold tracking-wider text-tally-textSecondary">
          {title}
        </Text>
      ) : null}

      <View className="overflow-hidden rounded-3xl bg-white">
        {items.map((item, index) => (
          <YouMenuItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
            onPress={() => onItemPress?.(item.id)}
          />
        ))}
      </View>
    </View>
  );
}
