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
import { Box, Paper } from "@mui/material";
import { tableWidth } from "../components/Display";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  //Create a theme instance.
  const theme = createTheme({
    palette: {
      mode: "dark",
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
          <Component {...pageProps} />
        </Paper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
