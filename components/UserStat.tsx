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
  TagLeftIcon,
} from "@chakra-ui/react";
import { RiSuitcaseLine } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";

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
  company: string;
  location: string;
  created_at: string;
}

export const UserStat: React.FC<UserStatProps> = ({ user }) => {
  const [userData, setUserData] = useState<GitHubResponseInterface | undefined>(
    undefined
  );
  const [createdAt, setCreatedAt] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (user !== undefined) {
      let url: string = `https://api.github.com/users/${user}`;
      fetch(url)
        .then((res) =>
          res.json().then((res: GitHubResponseInterface) => {
            let timestamp = Date.parse(res.created_at);
            const created = new Date(timestamp);
            setCreatedAt(new Date(created.toDateString()));
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
            showBorder={true}
          />
          <br />
          <br />
          <Text fontSize={"2xl"}>{userData?.name}</Text>
          <Link href={userData?.html_url} isExternal>
            <Tag size="lg" colorScheme="blue" borderRadius="full">
              <TagLabel>{userData?.login}</TagLabel>
            </Tag>
          </Link>
          <StatGroup marginTop={"1%"}>
            <Stat>
              <Link
                href={`https://github.com/${userData?.login}?tab=repositories`}
                isExternal
              >
                <StatLabel>Repositories</StatLabel>
              </Link>
              <StatNumber>{userData?.public_repos}</StatNumber>
            </Stat>
            <Stat>
              <Link
                href={`https://github.com/${userData?.login}?tab=followers`}
                isExternal
              >
                <StatLabel>Followers</StatLabel>
              </Link>
              <StatNumber>{userData?.followers}</StatNumber>
            </Stat>
            <Stat>
              <Link
                href={`https://github.com/${userData?.login}?tab=following`}
                isExternal
              >
                <StatLabel>Following</StatLabel>
              </Link>
              <StatNumber>{userData?.following}</StatNumber>
            </Stat>
          </StatGroup>
          {userData?.company && (
            <Tag size={"lg"} variant="outline" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={RiSuitcaseLine} />
              <TagLabel>{userData?.company}</TagLabel>
            </Tag>
          )}
          {userData?.location && (
            <Tag
              size={"lg"}
              marginLeft={"1%"}
              variant="outline"
              colorScheme="cyan"
            >
              <TagLeftIcon boxSize="12px" as={FaMapMarkerAlt} />
              <TagLabel>{userData?.location}</TagLabel>
            </Tag>
          )}
          {userData?.created_at && (
            <Tag
              size={"lg"}
              marginLeft={"1%"}
              variant="outline"
              colorScheme="cyan"
            >
              <TagLeftIcon boxSize="12px" as={AiOutlineCalendar} />
              <TagLabel>Joined at {createdAt?.toDateString()}</TagLabel>
            </Tag>
          )}
        </GridItem>
        <GridItem colSpan={2} />
      </Grid>
    </Box>
  );
};
