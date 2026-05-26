import { View, Text } from "react-native";

import { TypeChip } from "@/components/ui/create-group/type-chip";

export type GroupType = "trip" | "home" | "couple" | "event" | "other";

type GroupTypeSelectorProps = {
  value: GroupType;
  onChange: (next: GroupType) => void;
};

export function GroupTypeSelector({ value, onChange }: GroupTypeSelectorProps) {
  return (
    <View className="gap-3">
      <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
        TYPE
      </Text>

      <View className="flex-row flex-wrap gap-2">
        <TypeChip
          label="Trip"
          icon="flight"
          selected={value === "trip"}
          onPress={() => onChange("trip")}
        />
        <TypeChip
          label="Home"
          icon="home"
          selected={value === "home"}
          onPress={() => onChange("home")}
        />
        <TypeChip
          label="Couple"
          icon="favorite"
          selected={value === "couple"}
          onPress={() => onChange("couple")}
        />
        <TypeChip
          label="Event"
          icon="event"
          selected={value === "event"}
          onPress={() => onChange("event")}
        />
        <TypeChip
          label="Other"
          icon="more-horiz"
          selected={value === "other"}
          onPress={() => onChange("other")}
        />
      </View>
    </View>
  );
}

