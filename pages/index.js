import * as React from "react";

import Box from "@mui/material/Box";
import Link from "next/link";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  // Your code to update app data goes here
  // server.js or index.js

  return { props: { session } };
}

export default function Home() {
  const { data: session } = useSession();
  //console.log("session", session);
  // console.log("session.user.role", session.user.role);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    fontWeight: "bold",
    ":hover": {
      color: "green",
    },
  }));

  return (
    <div className="p-8">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Link href="/mui-table-search">
                  <Item>
                    <Inventory2OutlinedIcon />
                    Inventory
                  </Item>
                </Link>
              </Grid>
              <Grid item>
                <Item>
                  <Link href="/expiree-notifications">
                    <NotificationsOutlinedIcon />
                    Notifications
                  </Link>
                </Item>
              </Grid>
              <Grid item>
                <Item>
                  <Link href="/stocks-to-add-3">
                    <AddShoppingCartOutlinedIcon />
                    Add Stocks
                  </Link>
                </Item>
              </Grid>
              <Grid item>
                <Item>
                  <Link href="/create-order">
                    <CreateNewFolderOutlinedIcon />
                    Create Order
                  </Link>
                </Item>
              </Grid>
              <Grid item>
                <Item>
                  <Link href="/settings">
                    <SettingsOutlinedIcon />
                    Settings
                  </Link>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
