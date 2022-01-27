import type { NextPage } from "next";
import Head from "next/head";
import { Input, Box, Grid, GridItem } from "@chakra-ui/react";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>GitScore</title>
        <meta
          name="description"
          content="A web app that scores your GitHub Profile"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem
            minH={"60rem"}
            colSpan={24}
          >
            ITS YOUR BOY
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
