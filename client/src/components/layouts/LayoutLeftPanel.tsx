import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "@tanstack/react-router";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { TNavItemProps, TNavSectionProps } from "@client/lib/types/navPanels";

const NavSection = (props: TNavSectionProps) => {
  const { title, children } = props;
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant='caption'
        sx={{
          px: 3,
          mb: 1,
          display: "block",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "grey.500",
        }}
      >
        {title}
      </Typography>
      <List dense disablePadding>
        {children}
      </List>
    </Box>
  );
};

const NavItem = (props: TNavItemProps) => {
  const { href, icon: Icon, children } = props;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={href}
        // onClick={handleNavigation}
        sx={{
          borderRadius: 1,
          py: 0.5,
          my: 0.5,
          color: "grey.600",
          "&:hover": {
            backgroundColor: "grey.50",
            color: "grey.900",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
          <Icon fontSize='medium' />
        </ListItemIcon>
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  );
};

const drawerWidth = 200;
const overviewPanelOptions = [
  { label: "Dashboard", href: "#", icon: HomeIcon },
  { label: "Schedule", href: "#", icon: CalendarMonthIcon },
  { label: "Patients", href: "#", icon: AccessibilityIcon },
];

const LayoutLeftPanel = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const renderPanelContent = (
    <Stack
      flexDirection='column'
      sx={{
        height: "100%",
        bgcolor: theme.palette.mode === "dark" ? "#0F0F12" : "background.paper",
      }}
    >
      <Box
        sx={{
          height: 64,
          px: 3,
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "grey.200",
        }}
      >
        <Link href='https://kokonutui.com/'>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              color: theme.palette.mode === "dark" ? "white" : "grey.900",
            }}
          >
            PT me
          </Typography>
        </Link>
      </Box>

      <Box flexGrow={1} overflow='auto' p={2}>
        <NavSection title='Overview'>
          {overviewPanelOptions.map((item, idx) => (
            <NavItem
              key={`item-${idx}`}
              href={`/practice/${item.label.toLowerCase()}`}
              icon={item.icon}
            >
              {item.label}
            </NavItem>
          ))}
        </NavSection>
      </Box>

      <Box p={2} borderTop={1} borderColor='grey.200'>
        <List dense disablePadding>
          <NavItem href='#' icon={SettingsIcon}>
            Settings
          </NavItem>
        </List>
      </Box>
    </Stack>
  );

  return (
    <>
      {/* Desktop persistent drawer */}
      {isDesktop && (
        <Box
          component='nav'
          borderTop={1}
          borderColor='grey.200'
          sx={{
            width: { lg: drawerWidth },
            flexShrink: { lg: 0 },
          }}
        >
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: 1,
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1F1F23" : "grey.200",
              },
            }}
            open
          >
            {renderPanelContent}
          </Drawer>
        </Box>
      )}
    </>
  );
};

export default LayoutLeftPanel;
