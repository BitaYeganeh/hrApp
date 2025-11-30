import styles from './AddEmployee.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// LIST ALL FORM FIELDS HERE
const fields = [
  'name',
  'title',
  'salary',
  'phone',
  'email',
  'animal',
  'startDate',
  'location',
  'department',
  'skills',
];

//capitalize function for labels
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const AddEmployee = ({ formData, setFormData, onAddEmployee }) => {
  const navigate = useNavigate();

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddEmployee();
    // Reset form
    setFormData(Object.fromEntries(fields.map((f) => [f, ''])));
    navigate('/');
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className={styles.Container}>
      <h2 className={styles.heading}>Add New Person</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field}>
            <label htmlFor={field}>{capitalize(field)}:</label>
            <input
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              type={field === 'salary' ? 'number' : 'text'}
            />
          </div>
        ))}

        <button type="submit" className={styles.button}>
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
