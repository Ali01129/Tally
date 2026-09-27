import { router } from "expo-router";

import { PinCodeEntry } from "@/components/ui/pin-code/pin-code-entry";
import { setDraftPasscode } from "@/data/passcode";

const HINTS = [
  "Choose something only you will remember.",
  "Nice start.",
  "Keep it going.",
  "Looking solid.",
  "One more digit!",
  "Lock it in — hit enter!",
];

export default function CreatePasscodeScreen() {
  const handleComplete = (code: string) => {
    setDraftPasscode(code);
    setTimeout(() => {
      router.push("/confirm-passcode");
    }, 280);
  };

  return (
    <PinCodeEntry
      title="Create your passcode"
      completeTitle="Looking good"
      subtitle="You'll use this 6-digit code to unlock Tally."
      hints={HINTS}
      icon="lock"
      onComplete={handleComplete}
    />
  );
}
