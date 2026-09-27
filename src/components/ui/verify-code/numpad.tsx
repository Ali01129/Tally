import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

import { Colors } from "@/constants/theme";

const TALLY = Colors.tally;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type NumpadKey = {
  id: string;
  label?: string;
  type: "digit" | "delete" | "enter";
};

const KEYS: NumpadKey[] = [
  { id: "1", label: "1", type: "digit" },
  { id: "2", label: "2", type: "digit" },
  { id: "3", label: "3", type: "digit" },
  { id: "4", label: "4", type: "digit" },
  { id: "5", label: "5", type: "digit" },
  { id: "6", label: "6", type: "digit" },
  { id: "7", label: "7", type: "digit" },
  { id: "8", label: "8", type: "digit" },
  { id: "9", label: "9", type: "digit" },
  { id: "delete", type: "delete" },
  { id: "0", label: "0", type: "digit" },
  { id: "enter", type: "enter" },
];

type NumpadProps = {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  enterDisabled?: boolean;
};

function NumpadButton({
  keyDef,
  onPress,
  enterDisabled,
  enterReady,
}: {
  keyDef: NumpadKey;
  onPress: () => void;
  enterDisabled: boolean;
  enterReady: boolean;
}) {
  const scale = useSharedValue(1);
  const readyBounce = useSharedValue(1);

  const isEnter = keyDef.type === "enter";
  const isDelete = keyDef.type === "delete";
  const disabled = isEnter && enterDisabled;

  useEffect(() => {
    if (!isEnter) return;
    if (enterReady) {
      readyBounce.value = withSequence(
        withSpring(1.08, { damping: 8, stiffness: 220 }),
        withSpring(1, { damping: 10, stiffness: 180 }),
        withSpring(1.05, { damping: 10, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 180 }),
      );
    } else {
      readyBounce.value = withSpring(1);
    }
  }, [enterReady, isEnter, readyBounce]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * (isEnter ? readyBounce.value : 1) }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 280 });
  };

  const backgroundColor = isEnter
    ? enterReady
      ? TALLY.primary
      : TALLY.groupCircles
    : isDelete
      ? TALLY.primaryLight
      : "#FFFFFF";

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      className="h-[68px] flex-1 items-center justify-center rounded-3xl"
      style={[
        {
          backgroundColor,
          opacity: disabled ? 0.55 : 1,
          shadowColor: isEnter && enterReady ? TALLY.primary : "#000",
          shadowOpacity: isEnter && enterReady ? 0.35 : 0.06,
          shadowRadius: isEnter && enterReady ? 12 : 6,
          shadowOffset: { width: 0, height: 4 },
          elevation: isEnter && enterReady ? 6 : 1,
        },
        animatedStyle,
      ]}
    >
      {isDelete ? (
        <Feather name="delete" size={22} color={TALLY.primary} />
      ) : isEnter ? (
        <View className="flex-row items-center gap-1.5">
          <Text
            className="text-sm font-bold"
            style={{
              color: enterReady ? "#FFFFFF" : TALLY.textSecondary,
            }}
          >
            Go
          </Text>
          <Feather
            name="arrow-right"
            size={18}
            color={enterReady ? "#FFFFFF" : TALLY.textSecondary}
          />
        </View>
      ) : (
        <Text className="text-2xl font-bold text-tally-text">{keyDef.label}</Text>
      )}
    </AnimatedPressable>
  );
}

export function Numpad({
  onDigit,
  onDelete,
  onEnter,
  enterDisabled = false,
}: NumpadProps) {
  const enterReady = !enterDisabled;

  const handlePress = (key: NumpadKey) => {
    if (key.type === "digit" && key.label) {
      onDigit(key.label);
      return;
    }
    if (key.type === "delete") {
      onDelete();
      return;
    }
    if (key.type === "enter" && enterReady) {
      onEnter();
    }
  };

  return (
    <View className="gap-3">
      {chunk(KEYS, 3).map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row gap-3">
          {row.map((key) => (
            <NumpadButton
              key={key.id}
              keyDef={key}
              onPress={() => handlePress(key)}
              enterDisabled={enterDisabled}
              enterReady={enterReady}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}
