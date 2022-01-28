import type { NextPage } from "next";
import { useState } from "react";
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
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClickSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    window.location.href = `/stats/${value}`;
  };
  const onPressSubmit = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      console.log("HERE");
      window.location.href = `/stats/${value}`;
    }
  };

  return (
    <Box bg="dark.700">
      <Layout />
      <Box marginTop={"5%"}>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem colSpan={2} />
          <GridItem colSpan={8}>
            <Logo />
            <Text fontSize="3xl" align={"center"}>
              Get stats for your GitHub profile!
            </Text>
          </GridItem>
          <GridItem colSpan={2} />
        </Grid>
      </Box>
      <Box>
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
                marginLeft={"1%"}
                onKeyDown={onPressSubmit}
                onClick={onClickSubmit}
              >
                Submit
              </Button>
            </Flex>
          </GridItem>
          <GridItem colSpan={3} />
        </Grid>
      </Box>
      <Box marginTop={"2%"}>
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
