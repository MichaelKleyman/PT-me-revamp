import { Stack, styled, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MenuRef, MenuRefs } from "../../utils/types/types";

const menuItems = ["Services", "About Us", "Blog", "Pricing"] as const;
type MenuItem = (typeof menuItems)[number];

export const TopBar = ({
  menuRefs,
  handleClick,
}: {
  menuRefs: MenuRefs;
  handleClick: (ref: MenuRef) => void;
}) => {
  const handleMenuClick = (item: MenuItem) => {
    const ref = menuRefs[item];
    if (ref) {
      handleClick(ref);
    }
  };

  return (
    <Stack
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      p={2}
      width='100%'
      sx={{
        background: "transparent ",
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <Stack sx={{ color: "white", fontSize: "25px", fontWeight: "bold" }}>
        PT~me.
      </Stack>
      <StyledContainer>
        {menuItems.map((item) => (
          <StyledLink
            key={`menu-${item}`}
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </StyledLink>
        ))}
      </StyledContainer>
      <Stack
        flexDirection='row'
        py={2}
        px={5}
        borderRadius={7}
        gap={2}
        alignItems='center'
        sx={{
          background: "white",
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Typography>Get started</Typography>
        <ArrowForwardIcon />
      </Stack>
    </Stack>
  );
};

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "black",
  fontSize: "16px",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const StyledContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  padding: theme.spacing(2, 10),
  gap: theme.spacing(2),
  background: "white",
  borderRadius: theme.spacing(4),
}));
