import { create } from "zustand";
import { SecureStorageAdapter } from "../helpers/secure-storage-adapter";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

interface User {
    id: number;
    username: string;
}

export interface AuthState {
    status: AuthStatus;
    user?: User;

    loginStore: (user: User |undefined) => void;
    logout: () => Promise<void>;
    checkStatus: ()=> Promise<void>;
}

export const UseAuthStore = create<AuthState>()((set,get) => ({

    status: 'checking',
    user: undefined,
    loginStore: async(user: User | undefined) => {

        if(!user) {
            await SecureStorageAdapter.deleteItem('user')
            set({status: 'unauthenticated', user: undefined})
            return
        }

        await SecureStorageAdapter.setItem('user', JSON.stringify(user));
        set({status: 'authenticated', user})
    },

    checkStatus:async() => {
        const user = await SecureStorageAdapter.getItem('user');
        if(!user) {
            set({status: "unauthenticated", user: undefined});
            return
        }
        set({status: 'unauthenticated', user: undefined})
        return
    },

    logout: async()=>{
        await SecureStorageAdapter.deleteItem('user');
        set({status: 'unauthenticated', user: undefined});
    }
}))