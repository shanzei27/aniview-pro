import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Tabs, Tab } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import HistoryIcon from "@mui/icons-material/History";
import RecommendIcon from "@mui/icons-material/Recommend";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import drawerLeftTabs from "../../config/drawer_left_tabs";
import Stack from "@mui/material/Stack";
import { openInNewTab } from "../../utils/utils";

const drawerWidth = 240;

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function DrawerLeft(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = React.useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const buttonProps = (value) => ({
    selected: selectedIndex === value,
  });

  return (
    <Box>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {drawerLeftTabs["A"].map((data, index) => (
              <ListItem key={data.text} disablePadding>
                <ListItemButton
                  {...buttonProps(index)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.secondary.main,
                      color: "white",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: theme.palette.secondary.dark,
                      color: "white",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                    ":hover": {
                      backgroundColor: theme.palette.secondary.light,
                      color: "white",
                    },
                  }}
                  id={data.key}
                  onClick={(e) => {
                    props.handleSidebarLinkClick(e.currentTarget.id);
                    setSelectedIndex(index);
                  }}
                >
                  <ListItemIcon sx={{ marginRight: -1 }}>
                    {data.icon == "history" ? <HistoryIcon /> : null}
                    {data.icon == "recommend" ? <RecommendIcon /> : null}
                    {data.icon == "overview" ? <AccountCircleIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={data.text} />
                </ListItemButton>
              </ListItem>
            ))}{" "}
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader
                sx={{
                  textAlign: "left",
                }}
              >
                Your Ratings
              </ListSubheader>
            }
          >
            {drawerLeftTabs["B"].map((data, index) => (
              <ListItem key={data.text} disablePadding>
                <ListItemButton
                  {...buttonProps(index + 3)} //+3 because the submenu above has 3
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.secondary.main,
                      color: "white",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: theme.palette.secondary.dark,
                      color: "white",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                    ":hover": {
                      backgroundColor: theme.palette.secondary.light,
                      color: "white",
                    },
                  }}
                  id={data.key}
                  onClick={(e) => {
                    props.handleSidebarLinkClick(e.currentTarget.id);
                    setSelectedIndex(index + 3);
                  }}
                >
                  <ListItemIcon sx={{ marginRight: -1 }}>
                    {data.icon == "starFull" ? <StarIcon /> : null}
                    {data.icon == "starHalf" ? <StarHalfIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={data.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <List component={Stack} direction="row">
          {drawerLeftTabs["C"].map((data) => (
            <ListItem
              key={data.text}
              disablePadding
              onClick={() => openInNewTab(data.link)}
            >
              <ListItemButton id={data.key}>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "12px",
                    textAlign: "center",
                    fontWeight: 400,
                  }}
                  primary={data.text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          position: "absolute",
          display: { xs: "flex", md: "none" },
          borderBottom: 1,
          borderColor: "divider",
          height: 50,
          width: "100vw"
        }}
      >
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {drawerLeftTabs["mobile"].map((data, index) => (
            <Tab
              key={data.key}
              name={data.key}
              label={data.text}
              {...a11yProps(index)}
              onClick={(e) => props.handleSidebarLinkClick(e.currentTarget.name)}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
