import { Button, Container, TextField } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Lock } from '@material-ui/icons'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router'
import { authStore } from '../utils/authStore'
import { Link as RouterLink } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignUp() {
    const classes = useStyles()
    const signUp = authStore((state) => state.signUp)
    const history = useHistory()

    const { handleSubmit, getFieldProps } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ email, password }) => {
            await signUp(email, password)
            history.push('/')
        },
    })

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Lock />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        {...getFieldProps('email')}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        {...getFieldProps('password')}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="/signin"
                                variant="body2"
                            >
                                {'Aleady have an account? Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
