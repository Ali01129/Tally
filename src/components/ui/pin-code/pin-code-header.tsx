import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
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

const TALLY = Colors.tally;

type FloatingDotProps = {
  delay: number;
  left: number;
  top: number;
  size: number;
  color: string;
};

function FloatingDot({ delay, left, top, size, color }: FloatingDotProps) {
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
        withTiming(1, {
          duration: 2200 + delay,
          easing: Easing.inOut(Easing.sin),
        }),
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

type BadgeIcon = "mail" | "lock" | "shield";

function StatusBadge({
  filledCount,
  codeLength,
  icon,
  hasError,
}: {
  filledCount: number;
  codeLength: number;
  icon: BadgeIcon;
  hasError: boolean;
}) {
  const bounce = useSharedValue(1);
  const rotate = useSharedValue(0);
  const progress = filledCount / codeLength;

  useEffect(() => {
    if (hasError) {
      rotate.value = withSequence(
        withTiming(-10, { duration: 60 }),
        withTiming(10, { duration: 60 }),
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
      return;
    }

    bounce.value = withSequence(
      withSpring(1.12, { damping: 8, stiffness: 220 }),
      withSpring(1, { damping: 12, stiffness: 180 }),
    );
    rotate.value = withSequence(
      withTiming(-6, { duration: 90 }),
      withTiming(6, { duration: 90 }),
      withTiming(0, { duration: 90 }),
    );
  }, [bounce, filledCount, hasError, rotate]);

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value }, { rotate: `${rotate.value}deg` }],
  }));

  const badgeColor = hasError ? TALLY.red : TALLY.primary;
  const badgeBg = hasError ? "#FCEFE4" : TALLY.primaryLight;

  return (
    <Animated.View entering={FadeInDown.springify().damping(14)}>
      <Animated.View
        style={badgeStyle}
        className="h-20 w-20 items-center justify-center rounded-[28px]"
      >
        <View
          className="absolute inset-0 rounded-[28px]"
          style={{ backgroundColor: badgeBg }}
        />
        {!hasError ? (
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
        ) : null}
        <Feather name={icon} size={32} color={badgeColor} />
        {filledCount === codeLength && !hasError ? (
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

export type PinCodeHeaderProps = {
  filledCount: number;
  codeLength: number;
  title: string;
  completeTitle?: string;
  subtitle: string;
  hints: string[];
  icon?: BadgeIcon;
  showBack?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export function PinCodeHeader({
  filledCount,
  codeLength,
  title,
  completeTitle,
  subtitle,
  hints,
  icon = "mail",
  showBack = true,
  hasError = false,
  errorMessage = "That code doesn't match. Try again.",
}: PinCodeHeaderProps) {
  const hintIndex = Math.min(filledCount, hints.length - 1);
  const hint = hints[hintIndex] ?? hints[hints.length - 1];
  const heading =
    !hasError && filledCount === codeLength && completeTitle
      ? completeTitle
      : title;

  return (
    <View className="gap-5">
      <View className="flex-row items-center justify-between">
        {showBack ? (
          <IconButton
            icon={<Feather name="arrow-left" size={20} color="#000000" />}
            onPress={() => router.back()}
          />
        ) : (
          <View className="h-11 w-11" />
        )}
        <View
          className="rounded-full px-3 py-1.5"
          style={{
            backgroundColor: hasError ? "#FCEFE4" : TALLY.primaryLight,
          }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: hasError ? "#C47A3A" : TALLY.primary }}
          >
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
          <StatusBadge
            filledCount={filledCount}
            codeLength={codeLength}
            icon={icon}
            hasError={hasError}
          />
        </View>

        <Animated.View
          key={`${hintIndex}-${hasError ? "err" : "ok"}`}
          entering={FadeInDown.duration(220)}
          className="items-center gap-2"
        >
          <Text className="text-center text-3xl font-bold text-tally-text">
            {hasError ? "Oops, try again" : heading}
          </Text>
          <Text className="px-2 text-center text-base text-tally-textSecondary">
            {subtitle}
          </Text>
          <Text
            className="text-center text-sm font-medium"
            style={{ color: hasError ? "#C47A3A" : TALLY.primary }}
          >
            {hasError ? errorMessage : hint}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
