import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.css'

// import Header from "./components/Header";
// import Footer from "./components/Footer";
import Layout from "./Layout";
import PersonList from "./components/PersonList";
import About from "./pages/About";
//import { employees as employeeData } from "./data/employees";
import AddEmployee from "./pages/AddEmployee";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [employees, setEmployees] = useState([]);
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
    id: Date.now(), 
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

    // Optionally, clear the form
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

  })
  .catch((error) => {
    console.error("Error adding employee:", error);
  });
};

  //   setEmployees([
  //  ...employees,
  //   {
  //   id: Date.now(),
  //   ...formData, // COPIES ALL KEY-VALUE PAIRS FROM THE FORMDATA
  //   name: formData.name,
  //   title: formData.title,
  //   salary: formData.salary,
  //   phone: formData.phone,
  //   email: formData.email,
  //   animal: formData.animal,
  //   startDate: formData.startDate,
  //   location:formData.location,
  //   department:formData.department,
  //   skills:formData.skills.split(",").map(skill => skill.trim()),
       

  //    },
  //  ]);
    
  // };

 
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages (Header, Footer, your container, etc.) */}
        <Route path="/" element={<Layout />}>

          {/* Home page */} 
          <Route
            index
            element={<PersonList employees={employees} />}
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
    //   <Header/>
    //   <h1 className="siteTitle">Employee's Information</h1>
    //    <div className="container">
    //       <Routes>
    //         <Route path="/" element={<PersonList employees={employees} />} />
    //         <Route path="/about" element={<About />} />
    //           <Route
    //             path="/add" 
    //             element={
    //               <AddEmployee
    //                 formData={formData}
    //                 setFormData={setFormData}
    //                 onAddEmployee={onAddEmployee}
    //               />
    //             }
    //             />
    //       </Routes>
    //    </div>
    //   <Footer />
    // </Router>

