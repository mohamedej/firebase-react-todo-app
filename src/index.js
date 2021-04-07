import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#75b6e8',
            main: '#3f50b5',
            dark: '#002884',
            background: '#e1e1e1',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        type: 'light',
    },
})

const darkTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#75b6e8',
            main: '#3f8bb5',
            dark: '#326f90',
            background: '#565656',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        type: 'dark',
    },
})
const Main = () => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }
    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <BrowserRouter>
                <App
                    toggleTheme={toggleTheme}
                    theme={theme}
                    setTheme={setTheme}
                />
            </BrowserRouter>
        </ThemeProvider>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'))
