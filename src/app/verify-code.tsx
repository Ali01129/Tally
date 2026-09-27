import { router, useLocalSearchParams } from "expo-router";

import { PinCodeEntry } from "@/components/ui/pin-code/pin-code-entry";

const HINTS = [
  "Check your inbox — the digits are waiting.",
  "Nice start. Keep going.",
  "Halfway there…",
  "Looking good.",
  "One more digit!",
  "You're in — hit enter!",
];

export default function VerifyCodeScreen() {
  const { email, flow } = useLocalSearchParams<{
    email?: string;
    flow?: string;
  }>();

  const handleComplete = () => {
    setTimeout(() => {
      router.replace({
        pathname: "/create-passcode",
        params: flow ? { flow } : undefined,
      });
    }, 320);
  };

  return (
    <PinCodeEntry
      title="Got a secret code?"
      completeTitle="Code locked in"
      subtitle={email ? `Sent to ${email}` : "Sent to your email"}
      hints={HINTS}
      icon="mail"
      onComplete={handleComplete}
    />
  );
}
