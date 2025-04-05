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
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  ChevronRight,
} from "@mui/icons-material";
import { useState } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const LayoutTopBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const breadcrumbs: BreadcrumbItem[] = [{ label: "dashboard", href: "#" }];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    window.location.href = `/api/logout`;
  };

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: 1,
        borderColor: "grey.200",
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
              <ChevronRight fontSize='small' sx={{ color: "grey.500" }} />
            }
            aria-label='breadcrumb'
          >
            {breadcrumbs.map((item) => (
              <Typography
                key={item.label}
                color={"grey.700"}
                variant='body2'
                fontWeight='medium'
              >
                {item.label}
              </Typography>
            ))}
          </Breadcrumbs>
        </Box>

        {/* Right side controls */}
        <Box display='flex' alignItems='center' sx={{ gap: { xs: 1, sm: 2 } }}>
          <IconButton
            size='small'
            sx={{
              p: { xs: 0.75, sm: 1 },
              "&:hover": {
                bgcolor: "grey.100",
              },
              color: "grey.600",
            }}
          >
            <NotificationsIcon fontSize='small' />
          </IconButton>

          <IconButton size='small' onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar
              src='https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png'
              alt='User avatar'
              sx={{
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                border: 2,
                borderColor: "grey.200",
              }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LayoutTopBar;
