import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

import '@fontsource/fira-mono'
import '@fontsource/fira-sans'

import type { AppProps } from 'next/app'

export const ColorModeContext = React.createContext({ setIsDark: (dark: boolean) => {}, toggleColorMode: () => {} })

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      setIsDark: (dark: boolean): void => setMode(dark ? 'dark' : 'light'),
      toggleColorMode: (): void => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#953752' : '#33A4EB',
          },
        },
        typography: {
          fontFamily: 'Fira Sans, sans-serif',
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
