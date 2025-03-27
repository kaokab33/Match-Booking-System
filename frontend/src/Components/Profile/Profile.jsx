import React, { useState } from "react";
import { Grid, Paper ,Box} from "@mui/material";
import ProfilePage from "./ProfilePage";
export default function Profile() {
  const data = localStorage.getItem("user")
  const userData = JSON.parse(data)
  return (
    <Box>
            <ProfilePage data={userData} />
      </Box>
  );
}
