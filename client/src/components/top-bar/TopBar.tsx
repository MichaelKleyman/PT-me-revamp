import { Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MenuRef, MenuRefs } from "../../lib/utils/types/types";
import { StyledContainer, StyledLink, StyledNavItem } from "./styles";

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
          <StyledNavItem
            key={`menu-${item}`}
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </StyledNavItem>
        ))}
      </StyledContainer>
      <StyledLink to='/auth'>
        <Typography>Get started</Typography>
        <ArrowForwardIcon />
      </StyledLink>
    </Stack>
  );
};
