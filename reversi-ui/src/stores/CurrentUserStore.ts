import { create } from 'zustand'

interface CurrentUserState {
    currentUser: {
        id: number | undefined;
        username: string | undefined;
    };
    updateCurrentUser: (userId: number, username: string | undefined) => void;
}

export const useCurrentUser = create<CurrentUserState>((set) => ({
    currentUser: { id: undefined, username: undefined },
    updateCurrentUser: (userId, username) => set(() => ({ currentUser: { id: userId, username } })),
}));
