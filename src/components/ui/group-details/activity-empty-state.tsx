import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, type ComponentProps } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/constants/theme";

const TALLY = Colors.tally;

type FloatingChipProps = {
  delay?: number;
  duration: number;
  left: number;
  top: number;
  translateX: number;
  translateY: number;
  backgroundColor: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
  iconColor: string;
};

function FloatingChip({
  delay = 0,
  duration,
  left,
  top,
  translateX,
  translateY,
  backgroundColor,
  icon,
  iconColor,
}: FloatingChipProps) {
  const progress = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Initial bouncy entrance
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 160,
      });

      // Start floating after the icon appears
      progress.value = withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true,
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, duration, progress, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: scale.value,
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [0, translateX]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [0, translateY]),
      },
      {
        rotate: `${interpolate(progress.value, [0, 1], [-5, 5])}deg`,
      },
      {
        scale: scale.value * interpolate(progress.value, [0, 1], [1, 1.06]),
      },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute h-9 w-9 items-center justify-center rounded-full"
      style={[
        {
          left,
          top,
          backgroundColor,
        },
        animatedStyle,
      ]}
    >
      <MaterialIcons name={icon} size={17} color={iconColor} />
    </Animated.View>
  );
}

export function ActivityEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const pulse = useSharedValue(0);
  const bob = useSharedValue(0);
  const receiptScale = useSharedValue(0);

  useEffect(() => {
    // Soft background pulse
    pulse.value = withRepeat(
      withTiming(1, {
        duration: 1800,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true,
    );

    // Gentle receipt floating
    bob.value = withRepeat(
      withTiming(1, {
        duration: 2200,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );

    // Initial receipt bounce
    receiptScale.value = withSpring(1, {
      damping: 10,
      stiffness: 150,
    });
  }, [bob, pulse, receiptScale]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.45, 0]),
    transform: [
      {
        scale: interpolate(pulse.value, [0, 1], [1, 1.5]),
      },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: receiptScale.value,
    transform: [
      {
        translateY: interpolate(bob.value, [0, 1], [0, -6]),
      },
      {
        scale: receiptScale.value * interpolate(pulse.value, [0, 1], [1, 1.04]),
      },
    ],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      className="overflow-hidden rounded-2xl bg-white px-4 py-10"
    >
      {/* Decorative background circles */}
      <View className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-tally-groupCircles/70" />

      <View className="absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-tally-primaryLight" />

      <View className="items-center">
        {/* Illustration */}
        <View className="h-40 w-40 items-center justify-center">
          {/* Pulsing ring */}
          <Animated.View
            className="absolute h-20 w-20 rounded-full bg-tally-primaryLight"
            style={ringStyle}
          />

          {/* Floating payment icon */}
          <FloatingChip
            duration={1800}
            delay={100}
            left={8}
            top={48}
            translateX={6}
            translateY={-8}
            backgroundColor={TALLY.primaryLight}
            icon="payments"
            iconColor={TALLY.primary}
          />

          {/* Floating restaurant icon */}
          <FloatingChip
            duration={2200}
            delay={300}
            left={96}
            top={12}
            translateX={-7}
            translateY={-6}
            backgroundColor="#EEF8E8"
            icon="restaurant"
            iconColor="#6FA85A"
          />

          {/* Floating coffee icon */}
          <FloatingChip
            duration={2000}
            delay={500}
            left={116}
            top={96}
            translateX={7}
            translateY={-10}
            backgroundColor="#FBEBDC"
            icon="local-cafe"
            iconColor={TALLY.red}
          />

          {/* Main receipt */}
          <Animated.View
            className="h-16 w-16 items-center justify-center rounded-2xl bg-tally-primary"
            style={iconStyle}
          >
            <MaterialIcons name="receipt-long" size={28} color="#FFFFFF" />
          </Animated.View>
        </View>

        {/* Text */}
        <Text className="mt-2 text-center text-base font-bold text-tally-text">
          {title}
        </Text>

        <Text className="mt-1 max-w-[240px] text-center text-sm leading-5 text-tally-textSecondary">
          {description}
        </Text>
      </View>
    </Animated.View>
  );
}
