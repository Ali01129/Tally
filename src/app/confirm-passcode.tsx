import { router, useLocalSearchParams } from "expo-router";

import { PinCodeEntry } from "@/components/ui/pin-code/pin-code-entry";
import {
  clearDraftPasscode,
  getDraftPasscode,
  savePasscode,
} from "@/data/passcode";

const HINTS = [
  "Type the same code again.",
  "Matching so far…",
  "Keep going.",
  "Almost there.",
  "One more!",
  "Confirm — hit enter!",
];

export default function ConfirmPasscodeScreen() {
  const { flow } = useLocalSearchParams<{ flow?: string }>();
  const isChangePasscode = flow === "change-passcode";

  const handleComplete = async (code: string) => {
    const draft = getDraftPasscode();

    if (!draft) {
      router.replace({
        pathname: "/create-passcode",
        params: flow ? { flow } : undefined,
      });
      return false;
    }

    if (code !== draft) {
      return false;
    }

    await savePasscode(code);
    clearDraftPasscode();
    setTimeout(() => {
      if (isChangePasscode) {
        router.dismissTo("/edit-profile");
        return;
      }
      router.replace("/");
    }, 320);
  };

  return (
    <PinCodeEntry
      title="Confirm passcode"
      completeTitle="Ready to save"
      subtitle="Enter the same 6 digits one more time."
      hints={HINTS}
      icon="shield"
      errorMessage="Passcodes don't match. Try again."
      onComplete={handleComplete}
    />
  );
}
