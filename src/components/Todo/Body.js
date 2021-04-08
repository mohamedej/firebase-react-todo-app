import {
    Box,
    Button,
    IconButton,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core'
import React from 'react'
import { todoStore } from '../../utils/todoStore'
import { grey } from '@material-ui/core/colors'
import { Brightness2Rounded, Brightness4Outlined } from '@material-ui/icons'
import { auth } from '../../utils/firebase'
import Todo from '.'
import { authStore } from '../../utils/authStore'
import { Redirect } from 'react-router'

const useStyles = makeStyles((theme) => ({
    box: {
        margin: theme.spacing(2),
    },
    themeIcon: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
    todoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(4),
    },
    todoForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
    },
    todoInput: {
        margin: theme.spacing(2),
    },
    todoBackground: {
        backgroundColor: theme.palette.primary.background,
        borderRadius: '1%',
    },
    todoUL: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(2),
    },
    logOut: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
    },
}))

export default function TodoBody({ toggleTheme, theme, todos }) {
    const {
        input,
        setInput,
        deadLine,
        addTodo,
        setDeadline,
        setTodos,
    } = todoStore((state) => state)
    const user = authStore((state) => state.user)
    const isLoggedIn = authStore((state) => state.isLoggedIn)

    const classes = useStyles()

    if (!isLoggedIn) {
        return <Redirect to="/signin" />
    }
    return (
        <div className={`App ${classes.todoContainer}`}>
            <div className={classes.logOut}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        auth.signOut()
                        setTodos([])
                    }}
                >
                    Sign Out
                </Button>
            </div>

            <Box className={classes.todoBackground}>
                <Box
                    className={classes.box}
                    display="flex"
                    justifyContent="center"
                    my={4}
                >
                    <IconButton
                        color="primary"
                        variant="contained"
                        onClick={toggleTheme}
                        className={classes.themeIcon}
                    >
                        {theme === 'light' ? (
                            <Brightness2Rounded
                                style={{
                                    color: grey[900],
                                }}
                                fontSize="default"
                            />
                        ) : (
                            <Brightness4Outlined
                                style={{
                                    color: grey[50],
                                }}
                                color="primary"
                                fontSize="default"
                            />
                        )}
                    </IconButton>
                    <Typography variant="h4">Jledi's Todo-List 🔥🔥</Typography>
                </Box>
                <form>
                    <div className={classes.todoForm}>
                        <Box display="flex" flexDirection="row" m={1}>
                            <TextField
                                className={classes.todoInput}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                label="😝 Write a todo"
                                color="primary"
                            />
                            <TextField
                                className={classes.todoInput}
                                type="text"
                                value={deadLine}
                                onChange={(e) => setDeadline(e.target.value)}
                                label="⏰ Write a deadline"
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" m={1}>
                            <Button
                                disabled={!deadLine || !input}
                                variant="contained"
                                onClick={() => {
                                    addTodo(user.uid)
                                }}
                                color="primary"
                            >
                                Add Todo
                            </Button>
                        </Box>
                    </div>
                </form>
                <ul className={classes.todoUl}>
                    {todos.map((todo) => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </ul>
            </Box>
        </div>
    )
}
