import type { NextPage } from "next";
import Head from "next/head";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const Layout: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>GitScore</title>
        <meta
          name="description"
          content="A web app that scores your GitHub Profile"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem w="100%" h="50" />
        </Grid>
      </Box>
    </Box>
  );
};

export default Layout;
