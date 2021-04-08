import create from 'zustand'
import { db } from './firebase'

export const todoStore = create((set, get) => ({
    todos: [],
    setTodos: (v) => set({ todos: v }),
    deadLine: '',
    setDeadline: (v) => set({ deadLine: v }),
    input: '',
    setInput: (v) => set({ input: v }),
    loading: true,
    setLoading: (v) => set({ loading: v }),
    open: false,
    setOpen: (v) => set({ open: v }),
    addTodo: (uid) => {
        db.collection('todos').add({
            todo: get().input,
            deadline: get().deadLine,
            uid,
        })
        set({ input: '' })
        set({ deadLine: '' })
    },
    deleteTodo: (id) => {
        db.collection('todos')
            .doc(id)
            .delete()
            .catch((e) => console.log(e))
    },
    updateTodo: (id, text) => {
        db.collection('todos').doc(id).update({ todo: text })
    },
}))
