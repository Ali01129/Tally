import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { IconButton } from "@/components/ui/icon-button";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";

const TALLY = Colors.tally;

const HINTS = [
  "Check your inbox — the digits are waiting.",
  "Nice start. Keep going.",
  "Halfway there…",
  "Looking good.",
  "One more digit!",
  "You're in — hit enter!",
];

type VerifyCodeHeaderProps = {
  email?: string;
  filledCount: number;
  codeLength: number;
};

function FloatingDot({
  delay,
  left,
  top,
  size,
  color,
}: {
  delay: number;
  left: number;
  top: number;
  size: number;
  color: string;
}) {
  const progress = useSharedValue(0);
  const appear = useSharedValue(0);

  useEffect(() => {
    appear.value = withDelay(
      delay,
      withSpring(1, { damping: 12, stiffness: 140 }),
    );
    progress.value = withDelay(
      delay + 200,
      withRepeat(
        withTiming(1, { duration: 2200 + delay, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      ),
    );
  }, [appear, delay, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: appear.value * 0.9,
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -10]) },
      { scale: appear.value },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute rounded-full"
      style={[
        {
          left,
          top,
          width: size,
          height: size,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

function MailBadge({ filledCount, codeLength }: { filledCount: number; codeLength: number }) {
  const bounce = useSharedValue(1);
  const rotate = useSharedValue(0);
  const progress = filledCount / codeLength;

  useEffect(() => {
    bounce.value = withSequence(
      withSpring(1.12, { damping: 8, stiffness: 220 }),
      withSpring(1, { damping: 12, stiffness: 180 }),
    );
    rotate.value = withSequence(
      withTiming(-6, { duration: 90 }),
      withTiming(6, { duration: 90 }),
      withTiming(0, { duration: 90 }),
    );
  }, [bounce, filledCount, rotate]);

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.View entering={FadeInDown.springify().damping(14)}>
      <Animated.View
        style={badgeStyle}
        className="h-20 w-20 items-center justify-center rounded-[28px]"
      >
        <View
          className="absolute inset-0 rounded-[28px]"
          style={{ backgroundColor: TALLY.primaryLight }}
        />
        <View
          className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-[28px]"
          style={{ height: 80 }}
        >
          <View
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: Math.max(14, progress * 80),
              backgroundColor: TALLY.primary,
              opacity: 0.22,
            }}
          />
        </View>
        <Feather name="mail" size={32} color={TALLY.primary} />
        {filledCount === codeLength ? (
          <View
            className="absolute -right-1 -top-1 h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: TALLY.green }}
          >
            <Feather name="check" size={14} color={TALLY.text} />
          </View>
        ) : null}
      </Animated.View>
    </Animated.View>
  );
}

export function VerifyCodeHeader({
  email,
  filledCount,
  codeLength,
}: VerifyCodeHeaderProps) {
  const hintIndex = Math.min(filledCount, HINTS.length - 1);
  const hint = HINTS[hintIndex];

  return (
    <View className="gap-5">
      <View className="flex-row items-center justify-between">
        <IconButton
          icon={<Feather name="arrow-left" size={20} color="#000000" />}
          onPress={() => router.back()}
        />
        <View
          className="rounded-full px-3 py-1.5"
          style={{ backgroundColor: TALLY.primaryLight }}
        >
          <Text className="text-xs font-semibold" style={{ color: TALLY.primary }}>
            {filledCount}/{codeLength}
          </Text>
        </View>
      </View>

      <View className="items-center gap-4 pt-2">
        <View className="h-28 w-36 items-center justify-center">
          <FloatingDot delay={0} left={8} top={18} size={10} color="#D4C5F0" />
          <FloatingDot delay={120} left={118} top={12} size={8} color="#F5D0D8" />
          <FloatingDot delay={240} left={14} top={78} size={7} color="#B8D4F0" />
          <FloatingDot delay={180} left={112} top={72} size={9} color="#F5E6A3" />
          <MailBadge filledCount={filledCount} codeLength={codeLength} />
        </View>

        <Animated.View
          key={hintIndex}
          entering={FadeInDown.duration(220)}
          className="items-center gap-2"
        >
          <Text className="text-center text-3xl font-bold text-tally-text">
            {filledCount === codeLength ? "Code locked in" : "Got a secret code?"}
          </Text>
          <Text className="text-center text-base text-tally-textSecondary px-2">
            {email
              ? `Sent to ${email}`
              : "Sent to your email"}
          </Text>
          <Text
            className="text-center text-sm font-medium"
            style={{ color: TALLY.primary }}
          >
            {hint}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
