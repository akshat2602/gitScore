import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import Logo from "../components/utils/Logo";
import { SwitchThemeButton } from "../components/utils/SwitchTheme";

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const [userData, setUserData] = useState<object>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // const searchGithubUser = () => {
  // https://api.github.com/search/users\?q\=akshat\&per_page\=5
  // };

  const fetchGithubStats = async () => {
    // https://api.github.com/users/akshat2602/repos
    var url: string = `https://api.github.com/users/${value}/repos`;
    var res: object = await (await fetch(url)).json();
    console.log(res);
  };

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
          <GridItem w="100%" h="50" />
        </Grid>
      </Box>
      <Box>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem colSpan={2} />
          <GridItem colSpan={8}>
            <Logo />
            <Text fontSize="3xl" align={"center"}>
              Get your GitHub profile scored today!
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
          <GridItem colSpan={6}>
            <Flex>
              <Input
                value={value}
                onChange={handleChange}
                placeholder="Enter your GitHub username here!"
              />
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={fetchGithubStats}
                marginLeft={"1%"}
              >
                Get Score
              </Button>
            </Flex>
          </GridItem>
          <GridItem colSpan={3} />
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

export default Home;
