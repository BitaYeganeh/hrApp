import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Header from "./components/Header";
import About from "./pages/About";

import PersonList from "./components/PersonList";
import { employees as employeeData } from "./data/employees";
import Footer from "./components/Footer";
import AddEmployee from "./pages/AddEmployee";


function App() {
  const [employees, setEmployees] = useState(employeeData)
  const [formData, setFormData] = useState({
    name:"",
    title:"",
    salary:"",
    phone:"",
    email:"",
    animal:"",
    startDate:"",
    location:"",
    department:"",
    skills:""

  })
  const onAddEmployee = () => {
    setEmployees([
      ...employees,
      {
        id: Date.now(),
        ...formData, //COPIES ALL KEY-VALUE PAIRS FROM THE FORMDATA
        name: formData.name,
        title: formData.title,
        salary: formData.salary,
        phone: formData.phone,
        email: formData.email,
        animal: formData.animal,
        startDate: formData.startDate,
        location:formData.location,
        department:formData.department,
        skills:formData.skills.split(",").map(skill => skill.trim()),
       

      },
    ]);
    
  };

 
  return (
    <Router>
      <Header/>
      <h1 className="siteTitle">Employee's Information</h1>
       <div className="container">
          <Routes>
            <Route path="/" element={<PersonList employees={employees} />} />
            <Route path="/about" element={<About />} />
          
              <Route
                path="/add" 
                element={
                  <AddEmployee
                    formData={formData}
                    setFormData={setFormData}
                    onAddEmployee={onAddEmployee}
                  />
                }
                />
          </Routes>

  
         
       </div>
      <Footer />
    </Router>
  );
}
export default App;
