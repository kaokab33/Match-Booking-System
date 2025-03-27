import React, { useContext } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";

export default function NavBar() {
  const { user, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  }
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/register");
  };

  return (
    <Box padding="0.7rem 6%" backgroundColor="green" display="flex" justifyContent="space-between">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem,2rem,2.25rem)"
        color="white"
        sx={{ "&:hover": { cursor: "pointer" } }}
        onClick={() => navigate("/")}
      >
        Tazkarti
      </Typography>

      {user ? (
        <Box display="flex" alignItems="center" gap="1rem">
          {user.role === "Fan" && (
            <Avatar alt={user.username} src="/path/to/profile/image.jpg" sx={{ width: 35, height: 35 }} onClick={handleProfile}/>
          )}
          <Button onClick={handleLogOut}>
            <Typography color="white">Log Out</Typography>
          </Button>
        </Box>
      ) : (
        <Button onClick={handleSignIn}>
          <Typography color="white">Sign In</Typography>
        </Button>
      )}
    </Box>
  );
}
