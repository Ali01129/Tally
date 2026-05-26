import { Text, View, useWindowDimensions } from "react-native";

type GroupPreviewProps = {
  initials: string;
};

export function GroupPreview({ initials }: GroupPreviewProps) {
  const { width } = useWindowDimensions();

  const containerHeight = width * 0.4;
  const largeCircle = width * 0.44;
  const smallCircle = width * 0.28;
  const fontSize = width * 0.27;

  return (
    <View className="w-full">
      <View
        style={{ height: containerHeight }}
        className="relative w-full items-center justify-center overflow-hidden rounded-3xl bg-tally-groupBg"
      >
        <View
          style={{
            width: largeCircle,
            height: largeCircle,
            right: -largeCircle * 0.2,
            top: -50,
          }}
          className="absolute rounded-full bg-tally-groupCircles"
        />

        <View
          style={{
            width: smallCircle,
            height: smallCircle,
            left: -smallCircle * 0.2,
            bottom: -smallCircle * 0.2,
          }}
          className="absolute rounded-full bg-tally-groupCircles"
        />

        <Text style={{ fontSize }} className="font-bold text-tally-text">
          {initials}
        </Text>
      </View>
    </View>
  );
}
