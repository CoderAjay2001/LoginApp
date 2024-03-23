import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const paperStyle = {
  padding: 40,
  height: "80vh",
  width: 300,
  margin: "20px auto",
};

const avatarStyle = {
  backgroundColor: "#007080",
};

const textfieldStyle = {
  margin: "7px auto",
};
const btnStyle = {
  margin: "8px 0px",
};

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    city: "",
    phone: "",
    salary: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://13.127.74.58:8022/save", formData);
      console.log("Registration successful:", response.data);
      setFormData({
        fname: "",
        lname: "",
        city: "",
        phone: "",
        salary: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            id="outlined-helperText"
            label="First Name"
            placeholder="Enter First Name"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            style={textfieldStyle}
            fullWidth
          />
          <TextField
            id="outlined-helperText"
            label="Last Name"
            placeholder="Enter Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            style={textfieldStyle}
            fullWidth
          />
          <TextField
            id="outlined-helperText"
            label="City"
            placeholder="Enter City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={textfieldStyle}
            fullWidth
          />
          <TextField
            id="outlined-helperText"
            label="Phone"
            placeholder="Enter Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={textfieldStyle}
            fullWidth
          />
          <TextField
            id="outlined-helperText"
            label="Salary"
            placeholder="Enter Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={textfieldStyle}
            fullWidth
          />
          <TextField
            id="outlined-helperText"
            label="Username"
            placeholder="Enter Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={textfieldStyle}
            fullWidth
          />
          <TextField
            id="outlined-helperText"
            label="Password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            style={textfieldStyle}
            fullWidth
          />
          <Typography>
            {" "}
            If already have an account?
            <NavLink variant="filled" color="primary" to="/">
              Log in
            </NavLink>
          </Typography>
          <Button
            variant="contained"
            color="success"
            fullWidth
            style={btnStyle}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Signup;
