import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Input } from "@/components/ui/input";
import { Colors } from "@/constants/theme";

type EditProfileFormProps = {
  name: string;
  displayName: string;
  email: string;
  onChangeName: (value: string) => void;
  onChangeDisplayName: (value: string) => void;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View className="gap-2">
      <Text className="text-xs font-semibold tracking-wider text-tally-textSecondary">
        {label}
      </Text>
      {children}
    </View>
  );
}

export function EditProfileForm({
  name,
  displayName,
  email,
  onChangeName,
  onChangeDisplayName,
}: EditProfileFormProps) {
  return (
    <View className="gap-4">
      <Field label="FULL NAME">
        <Input
          icon={<Feather name="user" size={18} color={Colors.tally.text} />}
          placeholder="Full name"
          value={name}
          onChangeText={onChangeName}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </Field>

      <Field label="DISPLAY NAME">
        <Input
          icon={<Feather name="smile" size={18} color={Colors.tally.text} />}
          placeholder="Display name"
          value={displayName}
          onChangeText={onChangeDisplayName}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </Field>

      <Field label="EMAIL">
        <Input
          icon={
            <Feather name="mail" size={18} color={Colors.tally.textSecondary} />
          }
          placeholder="you@email.com"
          value={email}
          editable={false}
          selectTextOnFocus={false}
          containerClassName="opacity-60"
          className="text-tally-textSecondary"
        />
      </Field>
    </View>
  );
}
