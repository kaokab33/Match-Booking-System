import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";

const registerSchema = yup.object().shape({
  username: yup.string().required("required").min(3, "Username must be at least 3 characters"),
  password: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  birthDate: yup.date().required("required"),
  gender: yup.string().required("required"),
  city: yup.string().required("required"),
  address: yup.string().nullable(),
  email: yup.string().email("invalid email").required("required"),
  role: yup.string().oneOf(["Manager", "Fan"], "Invalid Role").required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  city: "",
  address: "",
  email: "",
  role: "Fan",
};

const initialValuesLogin = {
  username: "",
  password: "",
};

export default function Form() {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 800px)");
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const url = isLogin
        ? "http://localhost:3001/auth/login"
        : "http://localhost:3001/auth/register";
  
      const response = await axios.post(url, values);
  
      if (isLogin) {
        if (response.data.token) {
          console.log("Login Successful", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          login(response.data.user);
          navigate("/");
        } else {
          showSnackbar("Invalid username or password", "error");
        }
      } else {
        console.log("Registration Successful", response.data);
        resetForm();
        setPageType("login");
        showSnackbar("Registration successful! Please login.", "success");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
  
      if (isRegister && error.response?.status === 409) {
        showSnackbar("User already exists. Please try another username.", "error");
      } else if (isLogin && error.response?.status === 401) {
        showSnackbar("Invalid username or password.", "error");
      } else {
        showSnackbar(errorMessage, "error");
      }
    }
  };
  

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gap="30px"
            sx={{
              " & > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
              backgroundColor: "#f4f4f9",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isLogin ? (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={values.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.birthDate && Boolean(errors.birthDate)}
                  helperText={touched.birthDate && errors.birthDate}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Gender"
                  name="gender"
                  select
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                  label="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Email Address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                />
                <TextField
                  label="Role"
                  name="role"
                  select
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 4", backgroundColor: "#fff" }}
                >
                  <MenuItem value="Fan">Fan</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </TextField>
              </>
            )}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: "green",
                  color: "#fff",
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: "#007bff",
                  "&:hover": {
                    cursor: "pointer",
                    color: "#0056b3",
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </Box>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      )}
    </Formik>
  );
}
