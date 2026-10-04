import PersonCard from './PersonCard';
import styles from './PersonList.module.css';
import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

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

  if (status === 'loading') {
    return (
      <div className={styles.status} role="status">
        <CircularProgress size={28} />
        <Typography>Loading employees…</Typography>
        {isSlow && (
          <Typography variant="body2" className={styles.statusHint}>
            Waking up the demo server. On the free hosting plan this can take
            up to 30 seconds — thanks for waiting!
          </Typography>
        )}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.status} role="alert">
        <Typography>Couldn't load employees. The demo server may still be starting.</Typography>
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

export default PersonList;
