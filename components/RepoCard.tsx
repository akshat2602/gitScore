import React from "react";
import { Box, Badge, Icon, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { GitHubResponse } from "../pages/stats/[id]";
import { VscRepoForked } from "react-icons/vsc";
import { AiFillBook, AiFillStar } from "react-icons/ai";

export const RepoCard: React.FC<GitHubResponse> = (props) => {
  return (
    <LinkBox maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <LinkOverlay
        href={`https://github.com/${props.owner.login}/${props.name}`}
      >
        <Box p="6">
          <Box mt="1" fontWeight="semibold" as="h4">
            <Icon as={AiFillBook} />
            {props.name}
          </Box>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {props.language}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="md"
              textTransform="uppercase"
              ml="2"
            >
              {props.forks} <Icon as={VscRepoForked} /> {props.stargazers_count}{" "}
              <Icon as={AiFillStar} />
              {props.size} kb
            </Box>
            <br />
          </Box>
          <Box mt="1" fontWeight="semibold">
            {props.description}
          </Box>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};
