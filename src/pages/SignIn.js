import React from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import { authStore } from '../utils/authStore'
import { useHistory } from 'react-router'

export default function SignIn() {
    const logIn = authStore((state) => state.logIn)

    const history = useHistory()
    const { handleSubmit, getFieldProps } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ email, password }) => {
            await logIn(email, password)
            history.push('/')
        },
    })
    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="row" m={1}>
                <TextField
                    type="email"
                    {...getFieldProps('email')}
                    label="Email"
                    color="primary"
                />
                <TextField
                    type="text"
                    {...getFieldProps('password')}
                    label="Write a password"
                />
            </Box>
            <Box display="flex" flexDirection="column" m={1}>
                <Button variant="contained" type="submit" color="primary">
                    sign In
                </Button>
            </Box>
        </form>
    )
}
