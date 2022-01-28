import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { Box, Grid, GridItem, Text, Image, Link } from "@chakra-ui/react";
import Logo from "../components/utils/Logo";
import { SwitchThemeButton } from "../components/utils/SwitchTheme";

const custom404page: NextPage = () => {
  return (
    <Box bg="dark.700" minH={"60.5rem"}>
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
          <GridItem w="100%" h="125" />
        </Grid>
      </Box>
      <Box>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem colSpan={2} />
          <GridItem colSpan={8}>
            <Image src={"https://http.cat/404"} alt="404 - Page Not Found" />
            <Text fontSize="3xl" align={"center"} color={"teal.500"}>
              <Link href="/">Return To Home</Link>
            </Text>
          </GridItem>
          <GridItem colSpan={2} />
        </Grid>
      </Box>
      <Box>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem w="100%" h="50" />
        </Grid>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem colSpan={3} />
          <GridItem colSpan={6} align={"center"}>
            <SwitchThemeButton />
          </GridItem>
          <GridItem colSpan={3} />
        </Grid>
      </Box>
    </Box>
  );
};

export default custom404page;
