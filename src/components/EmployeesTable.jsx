import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import { getAnimalEmoji } from '../utils/animalEmoji';
import { formatDate, formatSalary } from '../utils/format';
import useAxios from '../hooks/useAxios';
import { API_URL } from '../config';
import styles from './EmployeesTable.module.css';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'department', label: 'Department' },
  { key: 'location', label: 'Location' },
  { key: 'startDate', label: 'Started' },
  { key: 'salary', label: 'Salary', numeric: true },
  { key: 'email', label: 'Contact', sortable: false },
  { key: 'skills', label: 'Skills', sortable: false },
];

const EmployeesTable = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'name', direction: 'asc' });

  const load = () => {
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`${API_URL}/employees`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  // Fetch employees on mount
  useEffect(load, [axiosInstance]);

  // Search across the main text fields, then sort by the chosen column
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? data.filter((e) =>
          [e.name, e.title, e.department, e.location, ...(e.skills || [])]
            .join(' ')
            .toLowerCase()
            .includes(q)
        )
      : data;
    const dir = sort.direction === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const col = columns.find((c) => c.key === sort.key);
      const x = a[sort.key] ?? '';
      const y = b[sort.key] ?? '';
      return col?.numeric
        ? (Number(x) - Number(y)) * dir
        : String(x).localeCompare(String(y)) * dir;
    });
  }, [data, query, sort]);

  const toggleSort = (key) =>
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));

  const renderBody = () => {
    if (loading) {
      return (
        <div className={styles.status} role="status">
          <CircularProgress size={28} />
          <Typography>Loading employees…</Typography>
        </div>
      );
    }
    if (error) {
      return (
        <div className={styles.status} role="alert">
          <Typography>Couldn't load employees ({error.message}).</Typography>
          <Button variant="contained" onClick={load}>
            Try again
          </Button>
        </div>
      );
    }
    if (!data || data.length === 0) {
      return (
        <div className={styles.status}>
          <Typography>No employees yet.</Typography>
        </div>
      );
    }

    return (
      <>
        <div className={styles.toolbar}>
          <TextField
            label="Search"
            placeholder="Name, title, department, skill…"
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
          />
          <Typography className={styles.count} aria-live="polite">
            Showing {rows.length} of {data.length}
          </Typography>
        </div>

        <TableContainer className={styles.tableWrap}>
          <Table size="small" stickyHeader aria-label="All employees">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.numeric ? 'right' : 'left'}
                    sortDirection={sort.key === col.key ? sort.direction : false}
                    className={styles.headCell}
                  >
                    {col.sortable === false ? (
                      col.label
                    ) : (
                      <TableSortLabel
                        active={sort.key === col.key}
                        direction={sort.key === col.key ? sort.direction : 'asc'}
                        onClick={() => toggleSort(col.key)}
                      >
                        {col.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell className={styles.nameCell}>
                    <span className={styles.avatar} aria-hidden="true">
                      {getAnimalEmoji(employee.animal)}
                    </span>
                    {employee.name}
                  </TableCell>
                  <TableCell className={styles.nowrap}>{employee.title}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.location}</TableCell>
                  <TableCell className={styles.nowrap}>
                    {formatDate(employee.startDate)}
                  </TableCell>
                  <TableCell align="right" className={styles.nowrap}>
                    {formatSalary(employee.salary)}
                  </TableCell>
                  <TableCell className={styles.contactCell}>
                    <a href={`mailto:${employee.email}`} className={styles.link}>
                      {employee.email}
                    </a>
                    <span className={styles.phone}>{employee.phone}</span>
                  </TableCell>
                  <TableCell className={styles.skillsCell}>
                    {Array.isArray(employee.skills) && employee.skills.length
                      ? employee.skills.join(', ')
                      : '—'}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No employees match “{query}”.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <section className={styles.page}>
      <Typography variant="h4" component="h1" className={styles.heading}>
        Employee table
      </Typography>
      {renderBody()}
    </section>
  );
};
export default EmployeesTable;
