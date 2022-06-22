import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../lib/createEmotionCache";
import { Box, Paper, Toolbar, useMediaQuery } from "@mui/material";
import { tableWidth } from "../components/Display";
import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"dark" | "light">(
    prefersDarkMode ? "dark" : "light"
  );

  //Create a theme instance.
  const theme = createTheme({
    palette: {
      mode,
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            maxWidth: `${tableWidth - 35}px`,
          },
        },
      },
    },
  });

  useEffect(() => {
    const localMode = localStorage.getItem("mode");
    if (localMode !== null) {
      setMode(localMode as "light" | "dark");
    }
  }, []);

  const _setMode = (newMode: "light" | "dark") => {
    localStorage.setItem("mode", newMode);
    setMode(newMode);
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>New House</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper
          sx={{
            minHeight: "100vh",
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AppHeader colorToggle={{mode, setter: _setMode}} />
          <Toolbar />
          <Component {...pageProps} />
        </Paper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
