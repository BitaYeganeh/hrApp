import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const features = [
  {
    icon: '👥',
    title: 'Employee records',
    text: 'Browse every employee as a card, add new people through a simple form, and edit or delete records with instant updates.',
  },
  {
    icon: '📅',
    title: 'Work experience',
    text: 'Years and months of service are calculated automatically from each start date, including month-end and future start dates.',
  },
  {
    icon: '🔔',
    title: 'HR reminders',
    text: 'The app flags who needs a probation review or a recognition meeting, so important conversations are not forgotten.',
  },
  {
    icon: '📊',
    title: 'Table view',
    text: 'See the whole team in one table for a quick overview of departments, roles and locations.',
  },
];

const reminders = [
  { when: 'First 6 months of employment', action: 'Schedule probation review' },
  {
    when: 'Every 5-year anniversary (5, 10, 15 …)',
    action: 'Schedule recognition meeting',
  },
];

const stack = [
  'React 19',
  'React Router',
  'Material UI',
  'Axios',
  'JSON Server REST API',
  'Vite',
  'Render',
];

const testing = [
  { value: '39', label: 'automated tests' },
  { value: '6', label: 'bugs found and fixed' },
  { value: 'CI', label: 'runs on every push' },
];

function About() {
  return (
    <div className={styles.about}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>About this app</p>
        <h1 className={styles.title}>HR Management System</h1>
        <p className={styles.lead}>
          A web app that helps HR teams keep employee data in one place and
          reminds them when it is time for a probation review or a
          work-anniversary recognition meeting.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            View employees
          </Link>
          <Link to="/add" className={styles.secondaryBtn}>
            Add an employee
          </Link>
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.heading}>
          What it does
        </h2>
        <ul className={styles.featureGrid}>
          {features.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p>{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reminders-heading">
        <h2 id="reminders-heading" className={styles.heading}>
          How the reminders work
        </h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">When</th>
              <th scope="col">Reminder</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((row) => (
              <tr key={row.action}>
                <td>{row.when}</td>
                <td>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="quality-heading">
        <h2 id="quality-heading" className={styles.heading}>
          Built and tested
        </h2>
        <p>
          The front end talks to a REST API that stores the employee data. Unit
          and component tests (Vitest, React Testing Library) check the date and
          reminder logic, and end-to-end tests (Playwright) add, edit and delete
          employees in a real browser. All tests run in GitHub Actions on every
          push.
        </p>
        <ul className={styles.stats}>
          {testing.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.chips} aria-label="Tech stack">
          {stack.map((item) => (
            <li key={item} className={styles.chip}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.author} aria-labelledby="author-heading">
        <h2 id="author-heading" className={styles.heading}>
          Who made it
        </h2>
        <p>
          Designed, built and tested by <strong>Bita Yeganeh</strong>, a junior
          full-stack developer and QA tester based in Espoo, Finland.
        </p>
        <p className={styles.links}>
          <a
            href="https://github.com/BitaYeganeh/hrApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code on GitHub
          </a>
          <a
            href="https://myportfolio-u7mw.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
          </a>
        </p>
      </section>
    </div>
  );
}

export default About;
