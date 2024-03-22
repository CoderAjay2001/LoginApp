import React, { useState } from "react";
import {
  Avatar,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const avatarStyle = {
  backgroundColor: "#007080",
};

const textfieldStyle = {
  margin: "7px auto",
};
const btnStyle = {
  margin: "8px 0px",
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const paperStyle = {
    padding: 40,
    height: "60vh",
    width: 300,
    margin: "50px auto",
    backgroundColor: darkMode ? "#333" : "white",
    color: darkMode ? "white" : "black",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://13.127.74.58:8021/login",
        formData
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/homepage");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            name="darkModeSwitch"
            color="primary"
          />
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <InputLabel
            htmlFor="outlined-helperText"
            style={{ color: darkMode ? "white" : "black" }}
          >
            Username
          </InputLabel>
          <TextField
            id="outlined-helperText"
            // label="Username"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={textfieldStyle}
            fullWidth
            InputProps={{
              style: {
                color: darkMode ? "white" : "black",
              },
            }}
          />
          <InputLabel
            htmlFor="outlined-helperText"
            style={{ color: darkMode ? "white" : "black" }}
          >
            Password
          </InputLabel>
          <TextField
            id="outlined-helperText"
            // label="Password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              style: {
                color: darkMode ? "white" : "black",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            fullWidth
            style={btnStyle}
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot Password?</Link>
          </Typography>
          <Typography>
            {" "}
            If you don't have an account?
            <NavLink variant="filled" color="primary" to="/signup">
              Sign Up
            </NavLink>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
