import { File, Paths } from "expo-file-system";

import appData from "./app-data.json";

type AuthData = {
  new_user: boolean;
  passcode: string | null;
};

/** Runtime overlay so auth changes persist without editing the bundled JSON. */
const authFile = new File(Paths.document, "app-data.auth.json");

const bundled = appData as Partial<AuthData>;

let memory: AuthData = normalize(bundled);

let draftPasscode: string | null = null;
let hydrated = false;

function isValidPasscode(value: unknown): value is string {
  return typeof value === "string" && /^\d{6}$/.test(value);
}

function normalize(data: Partial<AuthData>): AuthData {
  const passcode = isValidPasscode(data.passcode) ? data.passcode : null;
  const hasNewUserFlag = typeof data.new_user === "boolean";

  return {
    passcode,
    new_user: hasNewUserFlag ? data.new_user : passcode == null,
  };
}

async function ensureHydrated() {
  if (hydrated) return;
  hydrated = true;

  try {
    if (authFile.exists) {
      const parsed = JSON.parse(await authFile.text()) as Partial<AuthData>;
      memory = normalize({ ...bundled, ...parsed });
    }
  } catch {
    // Keep bundled defaults if the overlay cannot be read.
  }
}

async function persist() {
  try {
    if (!authFile.exists) {
      authFile.create();
    }
    authFile.write(
      JSON.stringify(
        {
          new_user: memory.new_user,
          passcode: memory.passcode,
        },
        null,
        2,
      ),
    );
  } catch {
    // In-memory value still works for the current session.
  }
}

export async function loadAuthData() {
  await ensureHydrated();
  return memory;
}

export async function isNewUser() {
  await ensureHydrated();
  return memory.new_user;
}

export async function getPasscode() {
  await ensureHydrated();
  return memory.passcode;
}

export async function hasPasscode() {
  const passcode = await getPasscode();
  return passcode != null;
}

export async function savePasscode(passcode: string) {
  await ensureHydrated();
  memory = {
    new_user: false,
    passcode,
  };
  draftPasscode = null;
  await persist();
}

export function setDraftPasscode(passcode: string) {
  draftPasscode = passcode;
}

export function getDraftPasscode() {
  return draftPasscode;
}

export function clearDraftPasscode() {
  draftPasscode = null;
}
