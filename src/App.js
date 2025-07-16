import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import Loader from "./Components/Loader";


const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
