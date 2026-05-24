import { Text, View } from "react-native";

type Avatar = {
  letter: string;
  color: string;
  size?: number;
  marginBottom?: number;
};

const AVATARS: Avatar[] = [
  { letter: "M", color: "#D4C5F0", size: 80, marginBottom: 0 },
  { letter: "J", color: "#B8D4F0", size: 120, marginBottom: 50 },
  { letter: "S", color: "#F5E6A3", size: 80, marginBottom: 0 },
  { letter: "P", color: "#F5D0D8", size: 100, marginBottom: 50 },
  { letter: "T", color: "#E8DCC8", size: 80, marginBottom: 0 },
];

export function LoginHeader() {
  return (
    <View className="items-start">
      <View className="mb-6 flex-row items-center justify-center">
        {AVATARS.map((avatar, index) => (
          <View
            key={avatar.letter}
            style={{
              backgroundColor: avatar.color,
              width: avatar.size ?? 44,
              height: avatar.size ?? 44,
              marginLeft: index === 0 ? 0 : -10,
              marginBottom: avatar.marginBottom ?? 0,
              zIndex: AVATARS.length - index,
              borderWidth: 2,
              borderColor: "#FFFFFF",
            }}
            className="items-center justify-center rounded-full"
          >
            <Text className="text-4xl font-bold text-tally-text">
              {avatar.letter}
            </Text>
          </View>
        ))}
      </View>

      <Text className="text-8xl font-bold text-tally-text">Tally.</Text>
      <View className="my-4 items-start">
        <Text className="text-3xl text-tally-textSecondary">
          Split expenses with friends.
        </Text>

        <Text className="text-3xl text-tally-textSecondary">
          Settle up, stay friends.
        </Text>
      </View>
    </View>
  );
}
