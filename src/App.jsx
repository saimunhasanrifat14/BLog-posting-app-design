import React from "react";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Blog from "./Pages/Blog";
import BlogDetails from "./Pages/BlogDetails";
import { BrowserRouter, Routes, Route } from "react-router";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogdetails" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
