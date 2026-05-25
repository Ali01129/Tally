import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LoginDivider } from "@/components/login-divider";
import { LoginHeader } from "@/components/login-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Colors } from "@/constants/theme";

const goHome = () => router.replace("/");

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-tally-background">
      <SafeAreaView className="flex-1 px-6">
        <View className="flex-1 justify-center gap-8">
          <LoginHeader />

          <View className="gap-4">
            <Input
              icon={<Feather name="mail" size={20} color="#000000" />}
              placeholder="maya@tally.app"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Button
              backgroundColor={Colors.tally.primary}
              text="Continue"
              icon={<Feather name="arrow-right" size={20} color="#FFFFFF" />}
              iconPosition="right"
              onPress={goHome}
            />

            <LoginDivider />

            <Button
              backgroundColor="#FFFFFF"
              text="Continue with Google"
              textColor={Colors.tally.text}
              icon={<FontAwesome name="google" size={20} color="#785DC3" />}
              iconPosition="left"
              onPress={goHome}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
