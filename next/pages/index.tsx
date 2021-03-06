import { Box, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import LazyDisplay from "../components/LazyDisplay";
import { tableWidth } from "../components/Display";
import Explanation from "../components/Explanation";
import { useState } from "react";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const [FAQ, setFAQ] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minWidth="100%"
    >
      <Head>
        <title>Mortgage Comparison</title>
        <meta
          name="description"
          content="This application generates spreadsheets that compare mortgages over various time horizons."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ minWidth: "100%" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          minWidth={{ xs: "100%", lg: tableWidth }}
        >
          <LazyDisplay />
          <Box width="100%" maxWidth={tableWidth}>
            <Button
              onClick={() => {
                setFAQ((prev) => !prev);
              }}
            >
              {FAQ ? "Hide FAQ" : "Show FAQ"}
            </Button>
            {FAQ && <Explanation />}
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default Home;
