import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url('/Home.avif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "99vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" gutterBottom>
            Welcome to Tazkarti!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Discover exciting matches, Buy tickets. Enjoy the game.
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/matches")}
            sx={{ mt: 2, padding: "12px 24px", fontSize: "1.2rem" }}
          >
            Show All Matches
          </Button>

          {user?.role === "Admin" && (
            <>
              <Button variant="contained" color="success" onClick={() => navigate("/pendingusers")} sx={{ mt: 2, ml: 2 ,padding: "12px 24px", fontSize: "1.2rem" }}>
                Show Pending Users
              </Button>
              <Button variant="contained" color="success" onClick={() => navigate("/allusers")} sx={{ mt: 2 ,padding: "12px 24px", fontSize: "1.2rem"  }}>
                Show All Users
              </Button>
            </>
          )}

          {user?.role === "Manager" && (
            <Button variant="contained" color="success" onClick={() => navigate("/viewStadium")} sx={{ mt: 2, ml: 2,padding: "12px 24px", fontSize: "1.2rem"  }}>
              View Stadium
            </Button>
          )}

          {user?.role === "Fan" && (
            <Button variant="contained" color="success" onClick={() => navigate("/viewTickets")} sx={{ mt: 2, ml: 2 ,padding: "12px 24px", fontSize: "1.2rem" }}>
              Show Tickets
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
