import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";
import { Avatar } from "./avatar";

export type OptionsBottomSheetOption = {
  value: string;
  label: string;
  avatarInitial?: string;
  avatarBackgroundColor?: string;
};

type OptionsBottomSheetProps = {
  isPresented: boolean;
  onDismiss: () => void;
  heading: string;
  options: OptionsBottomSheetOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
};

export function OptionsBottomSheet({
  isPresented,
  onDismiss,
  heading,
  options,
  selectedValue,
  onSelect,
}: OptionsBottomSheetProps) {
  const handleSelect = (value: string) => {
    onSelect(value);
    onDismiss();
  };

  return (
    <Modal
      visible={isPresented}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        <Pressable
          onPress={onDismiss}
          className="absolute inset-0 bg-tally-text/35"
        />

        <View className="overflow-hidden rounded-t-[28px] bg-tally-background px-5 pb-8 pt-4">
          <View className="mb-4 items-center">
            <View className="h-1.5 w-12 rounded-full bg-tally-groupCircles" />
          </View>

          <Text className="mb-4 text-xl font-semibold text-tally-text">
            {heading}
          </Text>

          <View className="overflow-hidden rounded-2xl bg-white">
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              const initial =
                option.avatarInitial ??
                option.label.trim().charAt(0).toUpperCase();
              const showMemberAvatar = heading === "Who paid?";

              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(option.value)}
                  className={`flex-row items-center gap-3 px-4 py-3.5 active:opacity-90 ${
                    option.value !== options[options.length - 1]?.value
                      ? "border-b border-black/5"
                      : ""
                  }`}
                >
                  {showMemberAvatar ? (
                    <Avatar
                      initial={initial}
                      backgroundColor={option.avatarBackgroundColor}
                      size={40}
                      className="shrink-0"
                    />
                  ) : (
                    <View className="relative h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-tally-groupBg">
                      <View className="absolute right-2 top-2 h-8 w-8 translate-x-1/2 -translate-y-1/2 rounded-full bg-tally-groupCircles" />
                      <View className="absolute bottom-1.5 left-1.5 h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-tally-groupCircles" />
                      <Text className="text-sm font-bold text-tally-text">
                        {initial}
                      </Text>
                    </View>
                  )}

                  <Text className="min-w-0 flex-1 text-base font-semibold text-tally-text">
                    {option.label}
                  </Text>

                  <Pressable
                    onPress={() => handleSelect(option.value)}
                    hitSlop={10}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isSelected }}
                    className="active:opacity-80"
                  >
                    <View
                      className={`h-7 w-7 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? "border-tally-primary bg-tally-primary"
                          : "border-tally-textSecondary bg-transparent"
                      }`}
                    >
                      {isSelected ? (
                        <Feather name="check" size={14} color="#FFFFFF" />
                      ) : null}
                    </View>
                  </Pressable>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}
