import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Tag,
  TagLabel,
  Link,
  Text,
} from "@chakra-ui/react";

interface UserStatProps {
  user: string | undefined;
}

interface GitHubResponseInterface {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
}

export const UserStat: React.FC<UserStatProps> = ({ user }) => {
  const [userData, setUserData] = useState<GitHubResponseInterface | undefined>(
    undefined
  );

  useEffect(() => {
    if (user !== undefined) {
      let url: string = `https://api.github.com/users/${user}`;
      fetch(url)
        .then((res) =>
          res.json().then((res: GitHubResponseInterface) => {
            setUserData(res);
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);
  return (
    <Box textAlign={"center"}>
      <Grid templateColumns={"repeat(12,1fr)"}>
        <GridItem colSpan={2} />
        <GridItem colSpan={8}>
          <Avatar
            size="2xl"
            name={userData?.login}
            src={userData?.avatar_url}
          />
          <br />
          <br />
          <Text fontSize={"2xl"}>{userData?.name}</Text>
          <Link href={userData?.html_url} isExternal>
            <Tag size="lg" colorScheme="pink" borderRadius="full">
              <TagLabel>{userData?.login}</TagLabel>
            </Tag>
          </Link>
          <StatGroup marginTop={"1%"}>
            <Stat>
              <StatLabel>Repositories</StatLabel>
              <StatNumber>{userData?.public_repos}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Followers</StatLabel>
              <StatNumber>{userData?.followers}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Following</StatLabel>
              <StatNumber>{userData?.following}</StatNumber>
            </Stat>
          </StatGroup>
        </GridItem>
        <GridItem colSpan={2} />
      </Grid>
    </Box>
  );
};
