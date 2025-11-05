import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import PersonList from "./components/PersonList";
import About from "./pages/About";


function App() {
  return (
    <Router>
      <Header/>
      <h1 className="siteTitle">Employee's Information</h1>
       <div className="container">
          <Routes>
            <Route path="/" element={<PersonList />} />
            <Route path="/about" element={<About />} />
          </Routes>
       </div>
      <Footer />
    </Router>
  );
}
export default App;
