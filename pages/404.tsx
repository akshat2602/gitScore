import type { NextPage } from "next";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Link,
  Center,
  VStack,
} from "@chakra-ui/react";
import { SwitchThemeButton } from "../components/utils/SwitchTheme";
import Layout from "../components/Layout";

const custom404page: NextPage = () => {
  return (
    <Box bg="dark.700">
      <Layout />
      <Box marginTop={"5%"}>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem colSpan={2} />
          <GridItem colSpan={8}>
            <Center>
              <VStack>
                <Image
                  src={"https://http.cat/404"}
                  alt="404 - Page Not Found"
                />
              </VStack>
            </Center>
            <Text fontSize="3xl" align={"center"} color={"teal.500"}>
              <Link href="/">Return To Home</Link>
            </Text>
          </GridItem>
          <GridItem colSpan={2} />
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

export default custom404page;
