# Tally

Tally is a small, mobile-first expense-splitting app built with Expo, React Native, and TypeScript. It helps groups track shared expenses, assign splits, and preview group balances with a simple, modern UI.

**Key Features**

- Create and manage groups
- Add expenses with amount, details, and attachments
- Assign splits among group members and compute assigned amounts
- View group balances and recent activity
- Lightweight local state using `zustand`

**Tech Stack**

- Expo (managed) + React Native
- TypeScript
- NativeWind / Tailwind CSS for styling
- Zustand for state management
- Metro bundler

Getting started

Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- Expo CLI (optional but recommended)

Install dependencies

```bash
npm install
# or
yarn install
```

Run the app

```bash
npm run start    # starts the Expo dev tools
npm run android  # open on Android emulator/device
npm run ios      # open on iOS simulator/device
npm run web      # run in the browser (react-native-web)
```

Project structure (important parts)

- `app/` — Expo Router routes and screens (login, tabs, add-expense, create-group)
- `src/components/` — UI components and feature-specific subfolders
- `src/lib/` — small utilities like `compute-assigned-amount.ts`
- `src/stores/` — client state (e.g., `add-expense-store.ts`)
- `assets/` — images and icons

Contributing

This repo is organized for rapid UI iteration. If you'd like to contribute:

1. Fork the repo and create a feature branch
2. Run the app locally and add or update components
3. Open a pull request with a clear description of changes

License

This project is open source. See the `LICENSE` file for details.

Where to look next

- UI components: `src/components/ui`
- Expense flows: `src/components/ui/add-expense`
- Group creation: `src/components/ui/create-group`

Enjoy building with Tally!
