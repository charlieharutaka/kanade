import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import Head from 'next/head'
import React from 'react'

import '@fontsource/fira-mono'

import type { AppProps } from 'next/app'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ColorModeContext = React.createContext({ setIsDark: (_: boolean) => {}, toggleColorMode: () => {} })

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light')
  const colorMode = React.useMemo(
    () => ({
      setIsDark: (dark: boolean): void => setMode(dark ? 'dark' : 'light'),
      toggleColorMode: (): void => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(() => {
    const t = createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'dark' ? '#BB6588' : '#87c9f3',
        },
      },
      typography: {
        fontFamily: 'Fira Mono, monospace',
      },
    })

    return createTheme(t, {
      components: {
        MuiCard: {
          defaultProps: {
            elevation: 0,
            square: true,
            variant: 'outlined',
          },
        },
        MuiDialog: {
          defaultProps: {
            PaperProps: {
              elevation: 0,
              square: true,
              variant: 'outlined',
            },
          },
        },
      },
    })
  }, [mode])

  return (
    <>
      <Head>
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <title>kanade</title>
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
