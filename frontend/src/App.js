import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ViewMatches from "./Components/Matches/ViewMatches";
import Register from "./Components/Auth/Register";
import NavBar from "./Components/NavBar/NavBar";
import AllUsers from "./Components/AllUsers/AllUsers";
import PendingUsers from "./Components/PendingUsers/PendingUsers";
import Profile from "./Components/Profile/Profile";
import CreateStadium from "./Components/Stadium/CreateStadium";
import ViewStadium from "./Components/Stadium/ViewStadium";
import { UserProvider } from "./Context";
import MyTickets from "./Components/Tickets/Tickets";
function App() {
  const theme = createTheme();
  const links = [
    { path: "/viewStadium", label: "View Stadium" },
  ];
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <NavBar links={links} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/matches" element={<ViewMatches />} />
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="pendingusers" element={<PendingUsers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/viewStadium" element={<ViewStadium userType={"manager"} />} />
            <Route path="/createStadium" element={<CreateStadium />} />
            <Route path="viewTickets" element={<MyTickets />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
