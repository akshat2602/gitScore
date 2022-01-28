import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Link,
  Image,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SwitchThemeButton } from "../../components/utils/SwitchTheme";
import Layout from "../../components/Layout";
import { UserStat } from "../../components/UserStat";

interface GitHubResponse {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  html_url: string;
  description: string;
  size: number;
  stargazers_count: number;
  language: string;
  topics: [string];
  forks: number;
}

interface GitHubErrorInterface {
  message: string;
}

type UnionType = [GitHubResponse] & GitHubErrorInterface;

const StatPage: NextPage = () => {
  const [userData, setUserData] = useState<[GitHubResponse] | []>([]);
  const [isError, setIsError] = useState<true | false>(false);
  const [resStatus, setResStatus] = useState<number>(200);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      let url: string = `https://api.github.com/users/${id}/repos`;
      fetch(url)
        .then((res) => {
          setResStatus(res.status);
          return res.json();
        })
        .then((res: UnionType) => {
          if (res?.message) {
            setIsError(true);
            return;
          } else {
            setUserData(res);
          }
        })
        .catch((err) => {
          setIsError(true);
          console.error(err);
        });
    }
  }, [id]);

  return (
    <Box bg="dark.700">
      <Layout />
      {!isError && (
        <Box marginTop={"3%"}>
          <Grid templateColumns={"repeat(12,1fr)"}>
            <GridItem colSpan={3} />
            <GridItem colSpan={6}>
              <UserStat user={userData[0]?.owner.login} />
            </GridItem>
            <GridItem colSpan={3} />
          </Grid>
        </Box>
      )}
      {isError && (
        <Box marginTop={"6%"}>
          <Grid templateColumns={"repeat(12,1fr)"}>
            <GridItem colSpan={3} />
            <GridItem colSpan={6}>
              <Text fontSize="3xl" align={"center"}>
                User not Found!
              </Text>
              <Center>
                <Image
                  src={`https://http.cat/${resStatus}`}
                  alt="404 - Page Not Found"
                />
              </Center>
              <Text fontSize="xl" align={"center"} color={"blue.500"}>
                <Link href="/">Return To Home</Link>
              </Text>
            </GridItem>
            <GridItem colSpan={3} />
          </Grid>
        </Box>
      )}
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

export default StatPage;
