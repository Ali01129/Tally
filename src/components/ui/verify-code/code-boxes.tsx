import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/constants/theme";

const CODE_LENGTH = 6;
const TALLY = Colors.tally;

const FILLED_COLORS = [
  "#D4C5F0",
  "#C9BEE7",
  "#B8A5E0",
  "#A78BD8",
  "#8F72CF",
  "#785DC3",
];

type CodeBoxesProps = {
  code: string;
};

function CodeBox({
  digit,
  index,
  isFilled,
  isActive,
}: {
  digit: string;
  index: number;
  isFilled: boolean;
  isActive: boolean;
}) {
  const scale = useSharedValue(1);
  const digitPop = useSharedValue(0);
  const activePulse = useSharedValue(0);

  useEffect(() => {
    if (isFilled) {
      scale.value = withSequence(
        withSpring(1.16, { damping: 8, stiffness: 280 }),
        withSpring(1, { damping: 12, stiffness: 200 }),
      );
      digitPop.value = withSpring(1, { damping: 10, stiffness: 220 });
    } else {
      digitPop.value = withTiming(0, { duration: 120 });
      scale.value = withSpring(1);
    }
  }, [digitPop, isFilled, scale]);

  useEffect(() => {
    if (isActive) {
      activePulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.35, { duration: 500 }),
        ),
        -1,
        false,
      );
    } else {
      activePulse.value = withTiming(0, { duration: 150 });
    }
  }, [activePulse, isActive]);

  const boxStyle = useAnimatedStyle(() => {
    const borderColor = isFilled
      ? FILLED_COLORS[index]
      : interpolateColor(
          activePulse.value,
          [0, 1],
          [TALLY.groupCircles, TALLY.primary],
        );

    return {
      transform: [{ scale: scale.value }],
      borderColor,
      backgroundColor: isFilled
        ? FILLED_COLORS[index]
        : isActive
          ? TALLY.primaryLight
          : "#FFFFFF",
      shadowOpacity: isFilled ? 0.18 : isActive ? 0.1 : 0,
      shadowRadius: isFilled ? 8 : 4,
      shadowOffset: { width: 0, height: 4 },
      elevation: isFilled ? 3 : 0,
      shadowColor: FILLED_COLORS[index],
    };
  });

  const digitStyle = useAnimatedStyle(() => ({
    opacity: digitPop.value,
    transform: [
      { scale: 0.55 + digitPop.value * 0.45 },
      { translateY: (1 - digitPop.value) * 10 },
    ],
  }));

  return (
    <Animated.View
      className="h-16 flex-1 items-center justify-center rounded-2xl border-2"
      style={boxStyle}
    >
      {isFilled ? (
        <Animated.View style={digitStyle}>
          <Text
            className="text-2xl font-bold"
            style={{ color: index >= 3 ? "#FFFFFF" : TALLY.text }}
          >
            {digit}
          </Text>
        </Animated.View>
      ) : isActive ? (
        <Animated.View entering={FadeIn.duration(200)}>
          <View
            className="h-5 w-1 rounded-full"
            style={{ backgroundColor: TALLY.primary, opacity: 0.75 }}
          />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

export function CodeBoxes({ code }: CodeBoxesProps) {
  const digits = code.padEnd(CODE_LENGTH, " ").slice(0, CODE_LENGTH).split("");

  return (
    <View className="gap-3">
      <View className="flex-row justify-between gap-2.5">
        {digits.map((digit, index) => (
          <CodeBox
            key={index}
            digit={digit}
            index={index}
            isFilled={digit !== " "}
            isActive={index === code.length}
          />
        ))}
      </View>

      <View className="flex-row items-center justify-center gap-1.5">
        {Array.from({ length: CODE_LENGTH }).map((_, index) => {
          const filled = index < code.length;
          return (
            <View
              key={index}
              className="h-1.5 rounded-full"
              style={{
                width: filled ? 16 : 6,
                backgroundColor: filled
                  ? FILLED_COLORS[index]
                  : TALLY.groupCircles,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

export { CODE_LENGTH };
