# Students GPA API
# This is me Teewara

Simple Node.js Express API that serves mocked student GPA data for the Faculty of Engineering.

Run:

```bash
npm install
npm start
```

Endpoints:

- `GET /students` - list all students; optional query `?department=Computer%20Engineering` to filter by department
- `GET /departments` - grouped students by department (each student with `id`, `name`, `gpa`)
- `GET /students/:id` - get individual student record (including `gpa`) by student ID

Mock data is in `egco344/students.json`.
# egco344_2569_ch1
