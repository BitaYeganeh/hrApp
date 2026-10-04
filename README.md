<h1 align="center">🌟 HR Management System (React + JSON Server API) 🌟</h1>

<p align="center">
A modern, user-friendly HR management web application built with <strong>React</strong>, <strong>React Router</strong>, <strong>Axios</strong>, and a <strong>JSON Server backend</strong>.
<br/>
This system enables teams to manage employees, track work experience, and automate HR reminders.
</p>

<p align="center">
  <a href="https://hrapp-1-68tb.onrender.com"><strong>🌐 Live Demo</strong></a> •
  <a href="https://hrapp-bec7.onrender.com/employees"><strong>📡 Backend API</strong></a>
</p>

<p align="center">
  <a href="https://github.com/BitaYeganeh/hrApp/actions/workflows/tests.yml"><img src="https://github.com/BitaYeganeh/hrApp/actions/workflows/tests.yml/badge.svg" alt="Tests" /></a>
  <img src="https://img.shields.io/badge/React-19-blue" />
  <img src="https://img.shields.io/badge/JSON--Server-API-green" />
  <img src="https://img.shields.io/badge/Status-Live-success" />
  <img src="https://img.shields.io/badge/Maintainer-Bita%20Yeganeh-pink" />
</p>

---

## ⭐ Features

### 👥 Employee Management

- 📄 View all employees
- ➕ Add new employees
- ✏️ Edit department, salary, phone, skills, and more
- ❌ Delete employees
- ⚡ Instant UI update on CRUD actions

---

### 📅 Work Experience Automation

Automatically calculates work experience based on `startDate`:

| Condition                             | HR Reminder                         |
| ------------------------------------- | ----------------------------------- |
| Work anniversary (5, 10, 15, … years) | 🎉 **Schedule recognition meeting** |
| Less than 6 months                    | 🔔 **Schedule probation review**    |

A month only counts once its day is reached, month-end start dates are handled in shorter months, and future start dates never produce negative values.

---

### 🎨 Clean & Modular UI

- 🧩 Employee cards with emoji avatars
- 🔄 Edit & display modes
- ℹ️ About page
- 🚫 404 error page
- 📌 Consistent layout with header + footer

---

### 🧩 Reusable Architecture

- ⚙ Custom `useAxios()` hook
- 🌐 One API address in `config.js` (overridable with `VITE_API_URL`)
- ⏳ Loading, "waking up the server", error + retry and empty states
- 🔧 Utilities:
  - `calculateWorkExperience.js`
  - `reminders.js`
  - `nextEmployeeId.js`
  - `animalEmoji.js`
- 🗂 Organized component structure & CSS modules

---

## 🧪 Testing & QA

The project is covered by **39 automated tests** that run on every push with GitHub Actions.

| Layer | Tool | What it covers |
| --- | --- | --- |
| Unit | Vitest | Work-experience maths, reminder rules, employee-id generation, emoji lookup |
| Component | Vitest + React Testing Library | Loading, slow-server, error/retry and empty states; reminder badges |
| End-to-end | Playwright | Listing, adding, editing and deleting employees in a real browser |

End-to-end tests run against a **local copy of the data** (`e2e/fixtures/db.json`), so the live API is never touched.

### Bugs found and fixed through testing

| # | Bug | Test that covers it |
| --- | --- | --- |
| 1 | Work experience ignored the day of the month (hired 31 Mar → "1 month" on 1 Apr) | `calculateWorkExperience.test.js` |
| 2 | Future start dates showed negative experience ("-1 years 11 months") | `calculateWorkExperience.test.js` |
| 3 | New employee ids used `length + 1`, reusing an existing id after a delete | `nextEmployeeId.test.js`, e2e "unique id" |
| 4 | Deleted employees reappeared after adding someone new | e2e "deletes an employee…" |
| 5 | Blank page while the free API server woke up (~30 s) | `PersonList.test.jsx` |
| 6 | Duplicate `horse` key in the emoji map | ESLint in CI |

### Run the tests

```bash
npm test            # unit + component tests (Vitest)
npm run test:watch  # Vitest in watch mode
npm run test:e2e    # end-to-end tests (Playwright; starts the app and a local API)
```

---

## 📁 Project Structure

src/
├── App.jsx
├── Layout.jsx
├── config.js
├── main.jsx
├── components/
│ ├── Header.jsx
│ ├── Footer.jsx
│ ├── PersonList.jsx
│ ├── Employee.jsx
│ ├── PersonCard.jsx
├── pages/
│ ├── AddEmployee.jsx
│ ├── About.jsx
│ └── ErrorPage.jsx
├── hooks/
│ └── useAxios.js
├── utils/
│ ├── calculateWorkExperience.js
│ └── animalEmoji.js
└── styles/

---

🐾 Emoji Generator:

Converts animal names like:
"Owl", "Snake", "Fox" into cute emoji avatars.

---

🎯 Highlights:
🧍 PersonCard Component
🔄 Edit & display modes
📝 PUT & DELETE support

---

📌 Displays:

- Name
- Phone
- Salary
- Department
- Skills
- Work experience
- Automated reminders
  ♻ Auto-refresh after backend updates

---

➕ AddEmployee Page:

- Dynamic form based on fields[]
- Fully controlled inputs
- Automatically converts comma-separated
- skills → array
- Submits through onAddEmployee()

---

🌐 Deployment:

The application is fully deployed on Render.

Service Link:

🎨 Frontend:
https://hrapp-1-68tb.onrender.com

🗄 Backend API:
https://hrapp-bec7.onrender.com/employees

---

👤 Author
Bita Yeganeh
🔗 GitHub: https://github.com/BitaYeganeh

📜 License

This project is open-source.
Feel free to modify, improve, and share it! 💙
