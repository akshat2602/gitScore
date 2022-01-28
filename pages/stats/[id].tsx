import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SwitchThemeButton } from "../../components/utils/SwitchTheme";
import Layout from "../../components/Layout";

const StatPage: NextPage = () => {
  const [userData, setUserData] = useState<object>({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      var url: string = `https://api.github.com/users/${id}/repos`;
      fetch(url)
        .then((res) =>
          res.json().then((res: object) => {
            setUserData(res);
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  return (
    <Box bg="dark.700" minH={"60.5rem"}>
      <Layout />
      <Box>
        <Grid templateColumns={"repeat(12,1fr)"}>
          <GridItem colSpan={2} />
          <GridItem colSpan={8}>
            <Text fontSize="3xl" align={"center"}>
              Hello!
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

export default StatPage;
