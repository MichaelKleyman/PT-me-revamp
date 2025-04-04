import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Box,
    Breadcrumbs,
    Link as MuiLink,
    useTheme,
  } from "@mui/material";
  import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    ChevronRight,
    DarkMode,
    LightMode,
  } from "@mui/icons-material";
  import { useState } from "react";
  
  interface BreadcrumbItem {
    label: string;
    href?: string;
  }
  
  export const LayoutTopBar = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [darkMode, setDarkMode] = useState(false);
  
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "PT-ME", href: "#" },
      { label: "dashboard", href: "#" },
    ];
  
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const toggleTheme = () => {
      setDarkMode(!darkMode);
      // You would implement actual theme switching logic here
    };
  
    return (
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{
          backgroundColor: darkMode ? "#0F0F12" : "white",
          borderBottom: 1,
          borderColor: darkMode ? "#1F1F23" : "grey.200",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Breadcrumbs */}
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              maxWidth: 300,
              overflow: "hidden",
            }}
          >
            <Breadcrumbs
              separator={
                <ChevronRight
                  fontSize='small'
                  sx={{ color: darkMode ? "grey.400" : "grey.500" }}
                />
              }
              aria-label='breadcrumb'
            >
              {breadcrumbs.map((item, index) => (
                <Typography
                  key={item.label}
                  color={darkMode ? "grey.300" : "grey.700"}
                  variant='body2'
                  fontWeight='medium'
                >
                  {item.label}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>
  
          {/* Right side controls */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}
          >
            <IconButton
              size='small'
              sx={{
                p: { xs: 0.75, sm: 1 },
                "&:hover": {
                  bgcolor: darkMode ? "#1F1F23" : "grey.100",
                },
                color: darkMode ? "grey.300" : "grey.600",
              }}
            >
              <NotificationsIcon fontSize='small' />
            </IconButton>
  
            <IconButton
              size='small'
              onClick={toggleTheme}
              sx={{
                p: { xs: 0.75, sm: 1 },
                "&:hover": {
                  bgcolor: darkMode ? "#1F1F23" : "grey.100",
                },
                color: darkMode ? "grey.300" : "grey.600",
              }}
            >
              {darkMode ? (
                <LightMode fontSize='small' />
              ) : (
                <DarkMode fontSize='small' />
              )}
            </IconButton>
  
            <IconButton size='small' onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                src='https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png'
                alt='User avatar'
                sx={{
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                  border: 2,
                  borderColor: darkMode ? "#2B2B30" : "grey.200",
                }}
              />
            </IconButton>
  
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 5,
                sx: {
                  width: { xs: 280, sm: 320 },
                  mt: 1.5,
                  bgcolor: darkMode ? "#0F0F12" : "background.paper",
                  border: 1,
                  borderColor: darkMode ? "#1F1F23" : "grey.200",
                  borderRadius: 2,
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            ></Menu>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };