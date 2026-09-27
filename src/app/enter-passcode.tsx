import { router } from "expo-router";

import { PinCodeEntry } from "@/components/ui/pin-code/pin-code-entry";
import { getPasscode } from "@/data/passcode";

const HINTS = [
  "Enter your Tally passcode.",
  "Nice start.",
  "Keep going.",
  "Halfway there…",
  "One more digit!",
  "Unlock — hit enter!",
];

export default function EnterPasscodeScreen() {
  const handleComplete = async (code: string) => {
    const saved = await getPasscode();

    if (!saved || code !== saved) {
      return false;
    }

    setTimeout(() => {
      router.replace("/");
    }, 320);
  };

  return (
    <PinCodeEntry
      title="Enter passcode"
      completeTitle="Welcome back"
      subtitle="Unlock Tally with your 6-digit passcode."
      hints={HINTS}
      icon="lock"
      showBack
      errorMessage="Wrong passcode. Try again."
      onComplete={handleComplete}
    />
  );
}
