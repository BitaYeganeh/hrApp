import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './Layout';
import PersonList from './components/PersonList';
import About from './pages/About';
import AddEmployee from './pages/AddEmployee';
import ErrorPage from './pages/ErrorPage';
import useAxios from './hooks/useAxios';
import EmployeeTablePage from './pages/EmployeeTablePage';
import { API_URL } from './config';
import { nextEmployeeId } from './utils/nextEmployeeId';
function App() {
  // ----------------------------
  // State
  // ----------------------------
  const [employees, setEmployees] = useState([]); //Employee state
  // 'loading' | 'ready' | 'error' — the free API server can take ~30 s to wake up
  const [status, setStatus] = useState('loading');
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

  // Remove a deleted employee from the shared list (not just the card list),
  // so they don't reappear after the next add
  const removeEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const { get, post } = useAxios();

  // Fetch employees from the API
  const loadEmployees = () => {
    setStatus('loading');
    get(`${API_URL}/employees`)
      .then((response) => {
        setEmployees(response.data);
        setStatus('ready');
      })
      .catch((error) => {
        console.error('Error loading employees:', error.message);
        setStatus('error');
      });
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ----------------------------
  // Event handlers
  // ----------------------------
  // Add new employee
  const onAddEmployee = () => {
    post(`${API_URL}/employees`, {
      id: nextEmployeeId(employees),
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
          error.response?.data || error.message
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
                status={status}
                onRetry={loadEmployees}
                updateEmployee={updateEmployee}
                deleteEmployee={removeEmployee}
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
          {/* New Emplyee Table Page */}
          <Route path="table" element={<EmployeeTablePage />} />
          {/* Wildcard route for all other paths */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
