"use client";
import { Stack, Typography } from "@mui/material";
import { StyledStack } from "./styles/stylesFooter";

export const Footer = () => {
  return (
    <StyledStack>
      {Array.from({ length: 4 }).map((_, i) => (
        <Stack key={i}>
          <Typography fontWeight="bold" fontSize="19px">
            Lorem
          </Typography>
          <Stack mt={2}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Typography
                key={i}
                fontSize="14px"
                p={0.5}
                sx={(theme) => ({
                  cursor: "pointer",
                  "&:hover": { color: theme.palette.background.paper },
                })}
              >
                Ipsum
              </Typography>
            ))}
          </Stack>
        </Stack>
      ))}
      {/* <Typography fontWeight="bold" fontSize="19px">
          Lorem
        </Typography> */}
    </StyledStack>
  );
};
