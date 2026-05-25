import { TextInput, View, type TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  icon?: React.ReactNode;
  containerClassName?: string;
};

export function Input({
  icon,
  containerClassName = "",
  className = "",
  placeholderTextColor = "#9CA3AF",
  ...props
}: InputProps) {
  return (
    <View
      className={`flex-row items-center rounded-2xl bg-white px-4 py-2 ${containerClassName}`}
    >
      {icon ? <View className="mr-2">{icon}</View> : null}
      <TextInput
        className={`flex-1 text-l text-tally-text ${className}`}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    </View>
  );
}
