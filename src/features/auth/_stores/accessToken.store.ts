import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type InitState = {
  accessToken: string | null;
};

type AccessTokenState = {
  setToken: (payload: string | null) => void;
  reset: () => void;
} & InitState;

const initialState: InitState = {
  accessToken: null,
};

export const useAccessTokenStore = create<AccessTokenState>()(
  devtools((set) => ({
    ...initialState,

    setToken: (payload) =>
      set(() => ({
        accessToken: payload,
      })),

    reset: () => set((prev) => ({ ...prev, ...initialState })),
  }))
);
