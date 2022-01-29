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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { SwitchThemeButton } from "../../components/utils/SwitchTheme";
import Layout from "../../components/Layout";
import { UserStat } from "../../components/UserStat";
import { RepoCard } from "../../components/RepoCard";

export interface GitHubResponse {
  id: number;
  name: string;
  owner: {
    login: string;
    company: string;
    location: string;
    created_at: Date;
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
  const [activeSortType, setActiveSortType] = useState<string>("Stars");
  const [resStatus, setResStatus] = useState<number>(200);

  const router = useRouter();
  const { id } = router.query;

  const sortUserData = (sortType: string) => {
    if (userData !== []) {
      let temp = userData.slice();
      if (sortType === "Stars") {
        temp.sort((a, b) =>
          a.stargazers_count > b.stargazers_count
            ? -1
            : b.stargazers_count > a.stargazers_count
            ? 1
            : 0
        );
      } else if (sortType === "Forks") {
        temp.sort((a, b) =>
          a.forks > b.forks ? -1 : b.forks > a.forks ? 1 : 0
        );
      } else {
        temp.sort((a, b) => (a.size > b.size ? -1 : b.size > a.size ? 1 : 0));
      }
      // @ts-ignore:next-line
      setUserData(temp);
      setActiveSortType(sortType);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
            res.sort((a, b) =>
              a.stargazers_count > b.stargazers_count
                ? -1
                : b.stargazers_count > a.stargazers_count
                ? 1
                : 0
            );
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
        <Box>
          <Box marginTop={"3%"}>
            <Grid templateColumns={"repeat(12,1fr)"}>
              <GridItem colSpan={2} />
              <GridItem colSpan={8}>
                <UserStat user={userData[0]?.owner.login} />
              </GridItem>
              <GridItem colSpan={2} />
            </Grid>
          </Box>
          <Box marginTop={"2%"}>
            <Grid templateColumns={"repeat(12,1fr)"}>
              <GridItem colSpan={2} />
              <GridItem colSpan={8} display={"flex"}>
                <Text
                  fontSize="xl"
                  align={"center"}
                  marginRight={"1%"}
                  marginTop={"0.3%"}
                >
                  Sort by
                </Text>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        marginRight={"1%"}
                      >
                        {activeSortType}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => sortUserData("Stars")}>
                          Stars
                        </MenuItem>
                        <MenuItem onClick={() => sortUserData("Forks")}>
                          Forks
                        </MenuItem>
                        <MenuItem onClick={() => sortUserData("Size")}>
                          Size
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
                <SwitchThemeButton />
              </GridItem>
              <GridItem colSpan={2} />
            </Grid>
          </Box>
          <Box marginTop={"3%"}>
            <Grid templateColumns={"repeat(12,1fr)"}>
              <GridItem colSpan={2} />
              {userData.slice(0, 4).map((data) => {
                return (
                  <GridItem key={data.name} colSpan={2} marginRight={"3%"}>
                    <RepoCard {...data} />
                  </GridItem>
                );
              })}
              <GridItem colSpan={2} />
            </Grid>
          </Box>
        </Box>
      )}
      {isError && (
        <Box marginTop={"6%"}>
          <Grid templateColumns={"repeat(12,1fr)"}>
            <GridItem colSpan={2} />
            <GridItem colSpan={8}>
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
            <GridItem colSpan={2} />
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default StatPage;
