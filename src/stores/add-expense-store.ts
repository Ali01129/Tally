import { create } from "zustand";

type AddExpenseState = {
  totalAmount: number;
  assignedAmount: number;
  setTotalAmount: (amount: number) => void;
  setAssignedAmount: (amount: number) => void;
  reset: () => void;
};

const initialState = {
  totalAmount: 0,
  assignedAmount: 0,
};

export const useAddExpenseStore = create<AddExpenseState>((set) => ({
  ...initialState,
  setTotalAmount: (amount) => set({ totalAmount: amount }),
  setAssignedAmount: (amount) => set({ assignedAmount: amount }),
  reset: () => set(initialState),
}));
