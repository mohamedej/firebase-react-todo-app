import { auth } from './firebase'
import create from 'zustand'

export const authStore = create((set, get) => ({
    user: {},
    isLoggedIn: false,
    setLoggedIn: (v) =>
        set({
            isLoggedIn: v,
        }),
    setUser: (v) =>
        set({
            user: v,
        }),
    logIn: async (e, p) => {
        return new Promise((res, rej) => {
            auth.signInWithEmailAndPassword(e, p)
                .then((userCredential) => {
                    set({ user: userCredential.user })
                    set({ isLoggedIn: true })
                    res()
                })
                .catch((err) => {
                    console.log(err)
                    rej(err)
                })
        })
    },
    signUp: async (e, p) => {
        return new Promise((res, rej) => {
            auth.createUserWithEmailAndPassword(e, p)
                .then((userCredential) => {
                    set({ user: userCredential.user })
                    set({ isLoggedIn: true })
                    res()
                })
                .catch((err) => {
                    console.log(err)
                    rej(err)
                })
        })
    },
    userCheck: (user) => {
        user = get().user
        auth.onAuthStateChanged(user)
    },
}))
