import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  type PinCodeHeaderProps,
  PinCodeHeader,
} from "@/components/ui/pin-code/pin-code-header";
import {
  CODE_LENGTH,
  CodeBoxes,
} from "@/components/ui/verify-code/code-boxes";
import { Numpad } from "@/components/ui/verify-code/numpad";
import { Colors } from "@/constants/theme";

type PinCodeEntryProps = {
  title: string;
  completeTitle?: string;
  subtitle: string;
  hints: string[];
  icon?: PinCodeHeaderProps["icon"];
  showBack?: boolean;
  errorMessage?: string;
  onComplete: (code: string) => boolean | void | Promise<boolean | void>;
};

export function PinCodeEntry({
  title,
  completeTitle,
  subtitle,
  hints,
  icon = "lock",
  showBack = true,
  errorMessage,
  onComplete,
}: PinCodeEntryProps) {
  const [code, setCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const celebrate = useSharedValue(0);

  const clearError = () => {
    if (hasError) setHasError(false);
  };

  const handleDigit = (digit: string) => {
    clearError();
    setCode((current) => {
      if (current.length >= CODE_LENGTH) return current;
      return current + digit;
    });
  };

  const handleDelete = () => {
    clearError();
    setCode((current) => current.slice(0, -1));
  };

  const handleEnter = async () => {
    if (code.length !== CODE_LENGTH || hasError) return;

    const result = await onComplete(code);
    if (result === false) {
      setHasError(true);
      setTimeout(() => setCode(""), 420);
      return;
    }

    celebrate.value = withSpring(1, { damping: 10, stiffness: 180 });
  };

  useEffect(() => {
    if (code.length === CODE_LENGTH && !hasError) {
      celebrate.value = withSpring(1, { damping: 12, stiffness: 160 });
    } else {
      celebrate.value = withTiming(0, { duration: 160 });
    }
  }, [celebrate, code.length, hasError]);

  const confettiStyle = useAnimatedStyle(() => ({
    opacity: hasError ? 0 : celebrate.value,
    transform: [{ scale: 0.85 + celebrate.value * 0.15 }],
  }));

  return (
    <View className="flex-1 bg-tally-background">
      <SafeAreaView className="flex-1 px-6">
        <View className="flex-1 pt-2 pb-6">
          <PinCodeHeader
            filledCount={code.length}
            codeLength={CODE_LENGTH}
            title={title}
            completeTitle={completeTitle}
            subtitle={subtitle}
            hints={hints}
            icon={icon}
            showBack={showBack}
            hasError={hasError}
            errorMessage={errorMessage}
          />

          <Animated.View
            entering={FadeInUp.delay(80).springify().damping(16)}
            className="mt-8"
          >
            <CodeBoxes code={code} hasError={hasError} />
          </Animated.View>

          <Animated.View
            pointerEvents="none"
            style={confettiStyle}
            className="absolute left-0 right-0 top-[42%] items-center"
          >
            {code.length === CODE_LENGTH && !hasError ? (
              <View className="flex-row gap-2">
                {[
                  "#D4C5F0",
                  "#F5D0D8",
                  "#B8D4F0",
                  "#F5E6A3",
                  Colors.tally.green,
                ].map((color, i) => (
                  <View
                    key={color}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: color,
                      marginTop: i % 2 === 0 ? 0 : 8,
                    }}
                  />
                ))}
              </View>
            ) : null}
          </Animated.View>

          <View className="mt-auto">
            <Numpad
              onDigit={handleDigit}
              onDelete={handleDelete}
              onEnter={() => {
                void handleEnter();
              }}
              enterDisabled={code.length !== CODE_LENGTH || hasError}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export { CODE_LENGTH };
