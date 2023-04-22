import { create } from 'zustand'

interface CurrentUserState {
    currentUser: {
        id: number | undefined;
        userName: string | undefined;
    };
    updateCurrentUser: (userId: number, userName: string | undefined) => void;
}

export const useCurrentUser = create<CurrentUserState>((set) => ({
    currentUser: { id: undefined, userName: undefined },
    updateCurrentUser: (userId, userName) => set(() => ({ currentUser: { id: userId, userName } })),
}));
