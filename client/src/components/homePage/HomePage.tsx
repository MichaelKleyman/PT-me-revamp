"use client";
import { Box, Stack, Typography } from "@mui/material";
import { StyledButtons, StyledStack } from "./styles/stylesHomePage";
import Image from "next/image";
import landing from "../../../public/assets/landing.png";

export const HomePage = () => {
  return (
    <StyledStack mt={20}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography fontWeight="bold" fontSize="43px" width="70%">
            Florken Wibble Zup Yentis{" "}
            <span style={{ color: "#3D5AFE" }}>
              Bloopnar Glop Crindle Flonk
            </span>{" "}
            Wermple Tronix Glurp Zoodle Pram with Glink Splorbnik Flexoodle
          </Typography>
          <Stack mt={5} flexDirection="row" alignItems="center" gap={5}>
            <StyledButtons
              href="/"
              sx={(theme) => ({
                color: "white",
                background: theme.palette.background.paper,
                fontWeight: "bold",
              })}
            >
              Get Started
            </StyledButtons>
            <StyledButtons href="/" sx={{ color: "blue", fontWeight: "bold" }}>
              Learn More
            </StyledButtons>
          </Stack>
        </Box>
        <Box>
          <Image
            src={landing}
            width={1500}
            height={600}
            alt="Landing Page Image"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Stack>
    </StyledStack>
  );
};
