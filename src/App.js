import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { authStore } from './utils/authStore'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import TodoBody from './components/Todo/Body'
import { todoStore } from './utils/todoStore'
import { auth, db } from './utils/firebase'
import { CircularProgress } from '@material-ui/core'

function App({ toggleTheme, theme, setTheme }) {
    const { setLoggedIn, setUser, user } = authStore((state) => state)
    const { loading, setLoading, todos, setTodos } = todoStore((state) => state)

    useEffect(() => {
        setTheme(localStorage.getItem('theme'))
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
                setUser(user)
            } else {
                setLoggedIn(false)
            }
            setLoading(false)
        })

        const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
            const todos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            const filterdTodos = todos.filter((todo) => todo.uid === user.uid)
            setTodos(filterdTodos)
        })

        return unsubscribe
    }, [setLoading, setLoggedIn, setTheme, setTodos, setUser, user, user.uid])

    if (loading) {
        return <CircularProgress />
    }

    return (
        <Switch>
            <Route path="/" exact>
                <TodoBody
                    todos={todos}
                    toggleTheme={toggleTheme}
                    theme={theme}
                />
            </Route>

            <Route path="/signup" exact>
                <SignUp />
            </Route>

            <Route path="/signin" exact>
                <SignIn />
            </Route>
        </Switch>
    )
}

export default App
