import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/homepage" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
