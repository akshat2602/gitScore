import React from "react";
import { Box, Avatar } from "@chakra-ui/react";

interface UserStatProps {
    
}

export const UserStat = () => {
  return (
    <Box>
      <Avatar
        size="2xl"
        name={"test"}
        src="https://bit.ly/sage-adebayo"
      />{" "}
    </Box>
  );
};
