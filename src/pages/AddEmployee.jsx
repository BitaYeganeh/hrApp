import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import styles from './AddEmployee.module.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// All form fields, grouped into sections
const sections = [
  {
    title: 'Person',
    fields: [
      { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
      { name: 'title', label: 'Job title', required: true },
      {
        name: 'animal',
        label: 'Favourite animal',
        helperText: 'Shown as the avatar, e.g. Owl, Fox or Cat',
      },
    ],
  },
  {
    title: 'Contact',
    fields: [
      { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
      { name: 'location', label: 'Location', helperText: 'City or office' },
    ],
  },
  {
    title: 'Job',
    fields: [
      { name: 'department', label: 'Department' },
      {
        name: 'salary',
        label: 'Salary (€ / month)',
        type: 'number',
        inputProps: { min: 0, step: 50 },
      },
      {
        name: 'startDate',
        label: 'Start date',
        type: 'date',
        required: true,
        helperText: 'Used for work experience and HR reminders',
      },
      {
        name: 'skills',
        label: 'Skills',
        helperText: 'Separate skills with commas, e.g. React, SQL',
        wide: true,
      },
    ],
  },
];

const fieldNames = sections.flatMap((s) => s.fields.map((f) => f.name));

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
    setFormData(Object.fromEntries(fieldNames.map((f) => [f, ''])));
    navigate('/');
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <section className={styles.page}>
      <Typography variant="h4" component="h1" className={styles.heading}>
        Add employee
      </Typography>
      <Typography className={styles.intro}>
        Fields marked with * are required.
      </Typography>

      <Card variant="outlined" className={styles.card}>
        <CardContent className={styles.cardContent}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {sections.map((section) => (
              <fieldset key={section.title} className={styles.section}>
                <legend className={styles.legend}>{section.title}</legend>
                <div className={styles.grid}>
                  {section.fields.map((field) => (
                    <TextField
                      key={field.name}
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type || 'text'}
                      required={field.required}
                      autoComplete={field.autoComplete || 'off'}
                      helperText={field.helperText}
                      value={formData[field.name]}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      className={field.wide ? styles.wide : undefined}
                      slotProps={{
                        htmlInput: field.inputProps,
                        inputLabel: field.type === 'date' ? { shrink: true } : undefined,
                      }}
                    />
                  ))}
                </div>
              </fieldset>
            ))}

            <div className={styles.actions}>
              <Button component={Link} to="/" variant="text">
                Cancel
              </Button>
              <Button variant="contained" type="submit" size="large">
                Add employee
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default AddEmployee;
