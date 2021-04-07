import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
import 'firebase/auth'
import { todoStore } from '../../utils/todoStore'

const Todo = ({ todo }) => {
    const [updateTodo, removeTodo] = todoStore((state) => [
        state.updateTodo,
        state.removeTodo,
    ])
    const [input, setInput] = useState(todo.todo)
    const [open, setOpen] = useState(false)

    return (
        <List>
            <ListItem>
                {open ? (
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Todo"
                        type="email"
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                ) : (
                    <ListItemText
                        primary={todo.todo}
                        secondary={`${todo.deadline} ⏰`}
                    />
                )}
                {open ? (
                    <Box mx={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateTodo(todo.id, input)
                                setOpen(false)
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                ) : (
                    <Box mx={2}>
                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                        >
                            Edit
                        </Button>
                    </Box>
                )}

                {open ? (
                    <Button variant="contained" onClick={setOpen(false)}>
                        Cancel
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            removeTodo(todo.id)
                        }}
                    >
                        Delete
                    </Button>
                )}
            </ListItem>
        </List>
    )
}
export default Todo
