import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
