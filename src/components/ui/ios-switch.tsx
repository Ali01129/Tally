import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

import { Colors } from "@/constants/theme";

const TRACK_WIDTH = 51;
const TRACK_HEIGHT = 31;
const THUMB_SIZE = 27;
const THUMB_MARGIN = 2;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2;

type IosSwitchProps = {
  value: boolean;
  onValueChange?: (value: boolean) => void;
};

export function IosSwitch({ value, onValueChange }: IosSwitchProps) {
  const offset = useRef(new Animated.Value(value ? TRAVEL : 0)).current;

  useEffect(() => {
    Animated.spring(offset, {
      toValue: value ? TRAVEL : 0,
      useNativeDriver: false,
      bounciness: 0,
      speed: 20,
    }).start();
  }, [offset, value]);

  const trackColor = offset.interpolate({
    inputRange: [0, TRAVEL],
    outputRange: ["#E9E9EA", Colors.tally.primary],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange?.(!value)}
      hitSlop={8}
    >
      <Animated.View
        style={{
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: trackColor,
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: "#FFFFFF",
            marginLeft: THUMB_MARGIN,
            transform: [{ translateX: offset }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 2.5,
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}
