import React, { Suspense, useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { StylesProvider, createGenerateClassName } from '@mui/styles'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import routes from './routes'
import Loader from './components/Loader'
import DashboardLayout from './layouts/Dashboard'
import { useSharedState } from './context/state.context'
import getTheme from './theme'
import './i18n'

const generateClassName = createGenerateClassName({
  productionPrefix: 'protonFullStack' // Change this name for project prefix
})

const App = () => {
  const [state] = useSharedState()

  const renderRoute = ({ component: Component, ...route }, index) => (
    <Route
      key={`path-${route.path}-${index}`}
      path={route.path}
      exact={route.exact}
    >
      <Component />
    </Route>
  )

  const userRoutes = useMemo(
    () => routes(state.user?.role || 'guest'),

    [state.user]
  )

  const theme = useMemo(() => getTheme(state.useDarkMode), [state.useDarkMode])

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DashboardLayout routes={userRoutes.sidebar}>
              <Suspense fallback={<Loader />}>
                <Switch>{userRoutes.browser.map(renderRoute)}</Switch>
              </Suspense>
            </DashboardLayout>
          </LocalizationProvider>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  )
}

export default App
