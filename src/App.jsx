import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.css'

import Layout from "./Layout";
import PersonList from "./components/PersonList";
import About from "./pages/About";
//import { employees as employeeData } from "./data/employees";
import AddEmployee from "./pages/AddEmployee";
import ErrorPage from "./pages/ErrorPage";

function App() {
const [employees, setEmployees] = useState([]);

//update one employee in the list
const updateEmployee = (updatedEmployee) => {
  setEmployees((prevEmployees) =>
    prevEmployees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    )
  );
};


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
// Use useEffect and axios.get() to fetch employees from http://localhost:3001/employees.
useEffect(() => {
  axios.get("http://localhost:3001/employees")
  .then((response) => {
    setEmployees(response.data);
  });
  
}, []);


// When submitting the form, use axios.post() to send the new employee to the server.

const onAddEmployee = () => {

  axios.post("http://localhost:3001/employees", {
    id: (employees.length + 1).toString(),
    name: formData.name,
    title: formData.title,
    salary: formData.salary,
    phone: formData.phone,
    email: formData.email,
    animal: formData.animal,
    startDate: formData.startDate,
    location: formData.location,
    department: formData.department,
    skills: formData.skills.split(",").map(skill => skill.trim()),
  })

  .then((response) => {
  // Add the new employee returned from server to local state
    setEmployees([...employees, response.data]);

 // Reset the form AFTER successful POST    
    setFormData({
      name: "",
      title: "",
      salary: "",
      phone: "",
      email: "",
      animal: "",
      startDate: "",
      location: "",
      department: "",
      skills: ""
    });
    alert("Employee added successfully!");
  })
  .catch((error) => {
    console.error("Error adding employee:", error.response.data || error.message);
  });
};
 
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages (Header, Footer, your container, etc.) */}
        <Route 
        path="/" 
        element={<Layout />}>

        {/* Home page */} 
        <Route
        index
        element={<PersonList employees={employees} updateEmployee={updateEmployee} />}
        />

        {/* About page */}
        <Route
        path="about"
        element={<About />}
        />

        {/* Add Employee page */}
        <Route
        path="add"
        element={
              <AddEmployee
                formData={formData}
                setFormData={setFormData}
                onAddEmployee={onAddEmployee}
              />
            }
        />
        {/* Wildcard route for all other paths */}
        <Route
        path="*"
        element={<ErrorPage />}
        />

        </Route>
      </Routes>
    </Router>
  );
}
export default App;