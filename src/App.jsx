import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './Layout';
import PersonList from './components/PersonList';
import About from './pages/About';
import AddEmployee from './pages/AddEmployee';
import ErrorPage from './pages/ErrorPage';
import useAxios from './hooks/useAxios';
function App() {
  // ----------------------------
  // State
  // ----------------------------
  const [employees, setEmployees] = useState([]); //Employee state
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    salary: '',
    phone: '',
    email: '',
    animal: '',
    startDate: '',
    location: '',
    department: '',
    skills: '',
  });

  // ----------------------------
  // Helper functions
  // ----------------------------
  // Reset the form
  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      salary: '',
      phone: '',
      email: '',
      animal: '',
      startDate: '',
      location: '',
      department: '',
      skills: '',
    });
  };

  // Update one employee in the list
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const { get, post } = useAxios();

  // Use useEffect and axios.get() to fetch employees from https://hrapp-bec7.onrender.com/employees.
  useEffect(() => {
    get('https://hrapp-bec7.onrender.com/employees').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  // ----------------------------
  // Event handlers
  // ----------------------------
  // Add new employee
  const onAddEmployee = () => {
    post('https://hrapp-bec7.onrender.com/employees', {
      id: (employees.length + 1).toString(),
      ...formData,
      skills: formData.skills.split(',').map((skill) => skill.trim()),
    })
      .then((response) => {
        // Add the new employee returned from server to local state
        setEmployees([...employees, response.data]);
        resetForm(); // Reset form after successful POST

        alert('Employee added successfully!');
      })
      .catch((error) => {
        console.error(
          'Error adding employee:',
          error.response.data || error.message
        );
      });
  };
  // ----------------------------
  // Render
  // ----------------------------
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages (Header, Footer, your container, etc.) */}
        <Route path="/" element={<Layout />}>
          {/* Home page */}
          <Route
            index
            element={
              <PersonList
                employees={employees}
                updateEmployee={updateEmployee}
              />
            }
          />

          {/* About page */}
          <Route path="about" element={<About />} />

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
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
