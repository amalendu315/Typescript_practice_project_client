import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { 
    Search as SearchIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Help as HelpIcon,
    Menu as MenuIcon,
    Close as CloseIcon,
 } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import zIndex from "@mui/material/styles/zIndex";

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const isNonMobileScreens = useMediaQuery("( min-width: 1000px )");
    const mode = useSelector((state: any) => state.mode);
    
    const { palette }:any = useTheme();
    const neutralLight = palette.neutral.light;
    const dark = palette.neutral.dark;
    const background = palette.background.default;
    const primaryLight = palette.primary.light;
    const alt = palette.background.alt;

    const fullName:any = `${user.firstName} ${user.lastName}`;

    const handleSearch = () => {};

  return (
    <FlexBetween
      padding="1rem 6%"
      sx={{
        backgroundColor: alt,
      }}
    >
      <FlexBetween>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: primaryLight,
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            sx={{
              backgroundColor: neutralLight,
              borderRadius: "9px",
              padding: "0.1rem 1.5rem",
            }}
            gap="3rem"
          >
            <InputBase
              placeholder="Search..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <IconButton
              onClick={() => {
                handleSearch();
              }}
            >
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode(!mode))}>
            {palette.mode === "dark" ? (
              <LightModeIcon sx={{ fontSize: "25px", color: dark }} />
            ) : (
              <DarkModeIcon sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <MessageIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <NotificationsIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <HelpIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <FormControl variant="standard">
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                value="logout"
                onClick={() => dispatch(setLogout({ user: null, token: null }))}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => {
            setIsMobileMenuToggled(!isMobileMenuToggled);
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          sx={{
            position: "fixed",
            right: "0",
            bottom: "0",
            height: "100%",
            zIndex: "10",
            minWidth: "500px",
            maxWidth: "500px",
            backgroundColor: background,
          }}
        >
          <Box display={"flex"} justifyContent={"flex-end"} padding={"1rem"}>
            <IconButton
              onClick={() => {
                setIsMobileMenuToggled(!isMobileMenuToggled);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode(!mode))}
              sx={{ fontSize: "25px" }}
            >
              {palette.mode === "dark" ? (
                <DarkModeIcon sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeIcon sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>
            <IconButton>
              <MessageIcon sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <NotificationsIcon sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <HelpIcon sx={{ fontSize: "25px" }} />
            </IconButton>
            <FormControl variant="standard">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem value="logout" onClick={() => dispatch(setLogout({ user:null, token:null }))}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
