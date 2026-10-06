import PersonCard from './PersonCard';
import styles from './PersonList.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// After this long, explain that the free API server is waking up
const SLOW_LOAD_MS = 3000;

const PersonList = ({
  employees,
  status = 'ready',
  onRetry,
  updateEmployee,
  deleteEmployee,
}) => {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (status !== 'loading') {
      setIsSlow(false);
      return;
    }
    const timer = setTimeout(() => setIsSlow(true), SLOW_LOAD_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const renderBody = () => {
    if (status === 'loading') {
      return (
        <div className={styles.status} role="status">
          <CircularProgress size={28} />
          <Typography>Loading employees…</Typography>
          {isSlow && (
            <Typography variant="body2" className={styles.statusHint}>
              Waking up the demo server. On the free hosting plan this can
              take up to 30 seconds — thanks for waiting!
            </Typography>
          )}
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className={styles.status} role="alert">
          <Typography>
            Couldn't load employees. The demo server may still be starting.
          </Typography>
          <Button variant="contained" onClick={onRetry}>
            Try again
          </Button>
        </div>
      );
    }

    if (employees.length === 0) {
      return (
        <div className={styles.status}>
          <Typography>No employees yet. Add the first one!</Typography>
        </div>
      );
    }

    return (
      <div className={styles.listContainer}>
        {employees.map((employee) => (
          <PersonCard
            key={employee.id}
            {...employee}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <Typography variant="h4" component="h1" className={styles.heading}>
            Employees
          </Typography>
          {status === 'ready' && (
            <Typography className={styles.count}>
              {employees.length} {employees.length === 1 ? 'person' : 'people'}
            </Typography>
          )}
        </div>
        <Button
          component={Link}
          to="/add"
          variant="contained"
          startIcon={<AddIcon />}
          className={styles.addButton}
        >
          New employee
        </Button>
      </div>
      {renderBody()}
    </section>
  );
};

export default PersonList;
