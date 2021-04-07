import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { authStore } from './utils/authStore'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import TodoBody from './components/Todo/Body'
import { todoStore } from './utils/todoStore'
import { auth, db } from './utils/firebase'

function App({ toggleTheme, theme, setTheme }) {
    const { isLoggedIn, setLoggedIn } = authStore((state) => state)
    const { loading, setLoading, todos, setTodos } = todoStore((state) => state)

    useEffect(() => {
        setTheme(localStorage.getItem('theme'))
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
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
            console.log(todos)
            setTodos(todos)
        })
        return unsubscribe
    }, [setLoading, setLoggedIn, setTheme, setTodos])

    if (!loading && !isLoggedIn) {
        return <Redirect to="/signin" />
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
