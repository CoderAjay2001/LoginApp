import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Switch,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const headingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
};
const textfieldStyle = {
  margin: "7px auto",
};

const btnStyle = {
  margin: "8px 8px",
};

const Home = () => {
  const navigate = useNavigate();
  const [openBookTableModal, setOpenBookTableModal] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    member: "",
  });
  const [orderData, setOrderData] = useState({
    itemname: "",
    quantity: 0,
    address: "",
    price: 0,
    status: false,
    deliverytype: '1day', 
  });

  const handleOpenBookTableModal = () => {
    setOpenBookTableModal(true);
  };

  const handleCloseBookTableModal = () => {
    setOpenBookTableModal(false);
  };

  const handleOpenOrderModal = () => {
    setOpenOrderModal(true);
  };
  const handleCloseOrderModal = () => {
    setOpenOrderModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleOrderChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (e) => {
    setOrderData({
      ...orderData,
      status: e.target.checked,
    });
  };

  const handleDeliveryTypeChange = (e) => {
    const { value } = e.target;
    setOrderData({ ...orderData, deliverytype: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://13.127.74.58:8022/homepage/booktable",
        formData
      );
      console.log("Table booked", response.data);
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        member: "",
        status: false,
      });
    } catch (error) {
      console.error("Booking failed", error);
    }
    handleCloseBookTableModal();
  };
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://13.127.74.58:8022/homepage/orders",
        orderData
      );
      console.log("Order Placed", response.data);
      setOrderData({
        itemname: "",
        quantity: 0,
        address: "",
        price: 0,
        status: false,
        deliverytype: "1day",
      });
    } catch (error) {
      console.error("Order Failed", error);
    }
    handleCloseOrderModal();
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Button
        variant="contained"
        onClick={handleOpenBookTableModal}
        style={btnStyle}
      >
        Book Table
      </Button>
      <Dialog open={openBookTableModal} onClose={handleCloseBookTableModal}>
        <DialogTitle style={headingStyle}>Book a table </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label=" Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              fullWidth
              style={textfieldStyle}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              style={textfieldStyle}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              style={textfieldStyle}
            />
            <TextField
              id="outlined-number"
              label="Members"
              type="number"
              name="member"
              value={formData.member}
              onChange={handleChange}
              fullWidth
              style={textfieldStyle}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                onClick={handleCloseBookTableModal}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Button
        variant="contained"
        onClick={handleOpenOrderModal}
        style={btnStyle}
      >
        Place Order online
      </Button>
      <Dialog open={openOrderModal} onClose={handleCloseOrderModal}>
        <DialogTitle style={headingStyle}>Place your order </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Item name"
              name="itemname"
              value={orderData.itemname}
              onChange={handleOrderChange}
              fullWidth
              style={textfieldStyle}
            />
            <TextField
              id="outlined-number"
              label="Quantity"
              type="number"
              name="quantity"
              value={orderData.quantity}
              onChange={handleOrderChange}
              fullWidth
              style={textfieldStyle}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Address"
              name="address"
              value={orderData.address}
              onChange={handleOrderChange}
              fullWidth
              style={textfieldStyle}
            />

            <TextField
              id="outlined-number"
              label="Price"
              type="number"
              name="price"
              value={orderData.price}
              onChange={handleOrderChange}
              fullWidth
              style={textfieldStyle}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "16px",
                fontSize: "18px",
              }}
            >
              <span>Status</span>
              <Switch
                checked={orderData.status}
                onChange={handleStatusChange}
                name="status"
                inputProps={{ "aria-label": "order status switch" }}
                color="success"
                required
              />
            </div>
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "16px",
                  fontSize: "18px",
                }}
              >
                Delivery Type
              </FormLabel>
              <RadioGroup
                row
                name="deliverytype"
                value={orderData.deliverytype}
                onChange={handleDeliveryTypeChange}
              >
                <FormControlLabel
                  value="1day"
                  control={<Radio />}
                  label="1 day"
                />
                <FormControlLabel
                  value="2day"
                  control={<Radio />}
                  label="2 days"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="3+ days"
                />
              </RadioGroup>
            </FormControl>

            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleOrderSubmit}
              >
                Submit
              </Button>
              <Button
                onClick={handleCloseOrderModal}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Button variant="contained" onClick={logoutHandler} style={btnStyle}>
        Log out
      </Button>
    </div>
  );
};

export default Home;
