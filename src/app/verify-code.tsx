import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CODE_LENGTH,
  CodeBoxes,
} from "@/components/ui/verify-code/code-boxes";
import { Numpad } from "@/components/ui/verify-code/numpad";
import { VerifyCodeHeader } from "@/components/ui/verify-code/verify-code-header";
import { Colors } from "@/constants/theme";

export default function VerifyCodeScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState("");
  const celebrate = useSharedValue(0);

  const handleDigit = (digit: string) => {
    setCode((current) => {
      if (current.length >= CODE_LENGTH) return current;
      return current + digit;
    });
  };

  const handleDelete = () => {
    setCode((current) => current.slice(0, -1));
  };

  const handleEnter = () => {
    if (code.length !== CODE_LENGTH) return;
    celebrate.value = withSequence(
      withSpring(1, { damping: 10, stiffness: 180 }),
      withDelay(280, withTiming(1)),
    );
    setTimeout(() => {
      router.replace("/");
    }, 420);
  };

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      celebrate.value = withSpring(1, { damping: 12, stiffness: 160 });
    } else {
      celebrate.value = withTiming(0, { duration: 160 });
    }
  }, [celebrate, code.length]);

  const confettiStyle = useAnimatedStyle(() => ({
    opacity: celebrate.value,
    transform: [{ scale: 0.85 + celebrate.value * 0.15 }],
  }));

  return (
    <View className="flex-1 bg-tally-background">
      <SafeAreaView className="flex-1 px-6">
        <View className="flex-1 pt-2 pb-6">
          <VerifyCodeHeader
            email={email}
            filledCount={code.length}
            codeLength={CODE_LENGTH}
          />

          <Animated.View
            entering={FadeInUp.delay(80).springify().damping(16)}
            className="mt-8"
          >
            <CodeBoxes code={code} />
          </Animated.View>

          <Animated.View
            pointerEvents="none"
            style={confettiStyle}
            className="absolute left-0 right-0 top-[42%] items-center"
          >
            {code.length === CODE_LENGTH ? (
              <View className="flex-row gap-2">
                {["#D4C5F0", "#F5D0D8", "#B8D4F0", "#F5E6A3", Colors.tally.green].map(
                  (color, i) => (
                    <View
                      key={color}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: color,
                        marginTop: i % 2 === 0 ? 0 : 8,
                      }}
                    />
                  ),
                )}
              </View>
            ) : null}
          </Animated.View>

          <View className="mt-auto">
            <Numpad
              onDigit={handleDigit}
              onDelete={handleDelete}
              onEnter={handleEnter}
              enterDisabled={code.length !== CODE_LENGTH}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
