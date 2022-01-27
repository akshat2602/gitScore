import React from "react";
import Image from "next/image";
import LogoDark from "../../public/LogoDark.svg";
import LogoLight from "../../public/LogoLight.svg";
import { useColorMode } from "@chakra-ui/react";

function Logo() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Image height={"300px"} src={colorMode === "light" ? LogoLight : LogoDark} alt="Logo" />
  );
}

export default Logo;
