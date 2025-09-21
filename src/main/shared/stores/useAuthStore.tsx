import { create } from "zustand";
import { SecureStorageAdapter } from "../helpers/secure-storage-adapter";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

interface User {
    // id: number;
    token: string;
    username: string;
}

export interface AuthState {
    status: AuthStatus;
    userName?: string;
    // token?: string;
    loginStore: (user: User |undefined) => void;
    logout: () => Promise<void>;
    checkStatus: ()=> Promise<void>;
}

export const UseAuthStore = create<AuthState>()((set,get) => ({

    status: 'checking',
    userName: undefined,
    // token: undefined,
    loginStore: async(user: User | undefined) => {

        if(!user) {
            await SecureStorageAdapter.deleteItem('userName')
            set({status: 'unauthenticated', userName: undefined})
            return
        }

        await SecureStorageAdapter.setItem('userName', user.username);
        await SecureStorageAdapter.setItem('token', user.token);
        set({status: 'authenticated', userName: user.username})
    },

    checkStatus:async() => {
        const userName = await SecureStorageAdapter.getItem('userName');
        // const token = await SecureStorageAdapter.getItem('token');
        if(!userName) {
            set({status: "unauthenticated", userName: undefined});
            return
        }
        set({status: 'authenticated', userName: userName })
        return
    },

    logout: async()=>{
        await SecureStorageAdapter.deleteItem('user');
        await SecureStorageAdapter.deleteItem('token');
        set({status: 'unauthenticated', userName: undefined});
    }
}))