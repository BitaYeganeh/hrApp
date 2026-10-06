import styles from './PersonCard.module.css';
import { getAnimalEmoji } from '../utils/animalEmoji';
import { useState, useEffect } from 'react';
import { calculateWorkExperience } from '../utils/calculateWorkExperience';
import useAxios from '../hooks/useAxios';
import { getReminders } from '../utils/reminders';
import { formatDate, formatExperience, formatSalary } from '../utils/format';
import { API_URL } from '../config';
import React from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Editable fields, built from the current props
const getInitialFormData = (salary, location, department, skills) => ({
  salary: salary || '',
  location: location || '',
  department: department || '',
  skills: skills ? skills.join(', ') : '',
});

const editFields = [
  { name: 'salary', label: 'Salary (€ / month)', type: 'number' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'department', label: 'Department', type: 'text' },
  {
    name: 'skills',
    label: 'Skills',
    type: 'text',
    helperText: 'Separate skills with commas',
  },
];

const PersonCard = ({
  id,
  name,
  title,
  salary,
  phone,
  email,
  animal,
  startDate,
  location,
  department,
  skills,
  updateEmployee,
  deleteEmployee,
}) => {
  // ----------------------------
  // Custom Hook
  // ----------------------------
  const { put, del } = useAxios(); // ALWAYS at the top

  // ----------------------------
  // State
  // ----------------------------
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() =>
    getInitialFormData(salary, location, department, skills)
  );
  const [savedMessage, setSavedMessage] = useState('');
  const [saving, setSaving] = useState(false);

  // Sync formData when props change
  useEffect(() => {
    setFormData(getInitialFormData(salary, location, department, skills));
  }, [salary, location, department, skills]);

  // Calculate work experience and HR reminders
  const workExperience = calculateWorkExperience(startDate);
  const reminders = getReminders(workExperience);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(getInitialFormData(salary, location, department, skills));
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      id,
      name,
      title,
      phone,
      email,
      animal,
      startDate,
      salary: formData.salary,
      location: formData.location,
      department: formData.department,
      skills: formData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    setSaving(true);
    put(`${API_URL}/employees/${id}`, updatedEmployee)
      .then((res) => {
        updateEmployee(res.data);
        setIsEditing(false);
        setSavedMessage('Changes saved!');
        setTimeout(() => setSavedMessage(''), 2500);
      })
      .catch((err) => console.error('Error updating employee:', err.message))
      .finally(() => setSaving(false));
  };

  // Delete employee handler
  const handleDelete = () => {
    if (!window.confirm(`Remove ${name} from the employee list?`)) {
      return;
    }
    del(`${API_URL}/employees/${id}`)
      .then(() => {
        deleteEmployee(id);
      })
      .catch((err) => console.error('Error deleting employee:', err.message));
  };

  // ----------------------------
  // Render
  // ----------------------------
  const details = [
    { label: 'Department', value: department },
    { label: 'Salary', value: formatSalary(salary) },
    {
      label: 'Email',
      value: email ? <a href={`mailto:${email}`}>{email}</a> : '—',
    },
    { label: 'Phone', value: phone ? <a href={`tel:${phone}`}>{phone}</a> : '—' },
    { label: 'Location', value: location },
    { label: 'Started', value: formatDate(startDate) },
    { label: 'Experience', value: formatExperience(workExperience) },
  ];

  return (
    <Card className={styles.person} variant="outlined">
      <CardContent className={styles.content}>
        <div className={styles.headerRow}>
          <span className={styles.avatar} aria-hidden="true">
            {getAnimalEmoji(animal)}
          </span>
          <div className={styles.identity}>
            <Typography variant="h6" component="h2" className={styles.name}>
              {name}
            </Typography>
            <Typography variant="body2" className={styles.title}>
              {title}
            </Typography>
          </div>
        </div>

        {reminders.includes('recognition') && (
          <p className={`${styles.reminder} ${styles.recognition}`}>
            <span aria-hidden="true">🎉</span> Schedule recognition meeting
          </p>
        )}

        {reminders.includes('probation') && (
          <p className={`${styles.reminder} ${styles.probation}`}>
            <span aria-hidden="true">🔔</span> Schedule probation review
          </p>
        )}

        {isEditing ? (
          <form className={styles.editForm} onSubmit={handleSave}>
            {editFields.map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                helperText={field.helperText}
                size="small"
                fullWidth
              />
            ))}
            <div className={styles.actions}>
              <Button variant="text" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={saving}>
                Save
              </Button>
            </div>
          </form>
        ) : (
          <>
            <dl className={styles.details}>
              {details.map((item) => (
                <div key={item.label} className={styles.detailRow}>
                  <dt>{item.label}</dt>
                  <dd>{item.value || '—'}</dd>
                </div>
              ))}
            </dl>

            {skills?.length > 0 && (
              <ul className={styles.skillsList} aria-label="Skills">
                {skills.map((skill, i) => (
                  <li key={i} className={styles.skillBox}>
                    {skill}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.actions}>
              {savedMessage && (
                <span className={styles.savedMessage} role="status">
                  {savedMessage}
                </span>
              )}
              <Button
                variant="text"
                color="error"
                startIcon={<DeleteOutlineIcon />}
                onClick={handleDelete}
              >
                Remove
              </Button>
              <Button
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonCard;
