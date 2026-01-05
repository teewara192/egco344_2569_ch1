const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_PATH = path.join(__dirname, 'students.json');

function loadStudents() {
	const raw = fs.readFileSync(DATA_PATH, 'utf8');
	return JSON.parse(raw);
}

// GET /students - list all students, optional ?department=...
app.get('/students', (req, res) => {
	try {
		const dept = req.query.department;
		let students = loadStudents();
		if (dept) {
			students = students.filter(s => s.department.toLowerCase() === dept.toLowerCase());
		}
		res.json(students.map(s => ({ id: s.id, name: s.name, department: s.department, gpa: s.gpa })));
	} catch (err) {
		res.status(500).json({ error: 'Failed to load students' });
	}
});

// GET /departments - grouped students by department with GPA
app.get('/departments', (req, res) => {
	try {
		const students = loadStudents();
		const grouped = {};
		students.forEach(s => {
			if (!grouped[s.department]) grouped[s.department] = [];
			grouped[s.department].push({ id: s.id, name: s.name, gpa: s.gpa });
		});
		res.json(grouped);
	} catch (err) {
		res.status(500).json({ error: 'Failed to load students' });
	}
});

// GET /students/:id - return individual student's GPA
app.get('/students/:id', (req, res) => {
	try {
		const id = req.params.id;
		const students = loadStudents();
		const student = students.find(s => s.id.toLowerCase() === id.toLowerCase());
		if (!student) return res.status(404).json({ error: 'Student not found' });
		res.json({ id: student.id, name: student.name, department: student.department, gpa: student.gpa });
	} catch (err) {
		res.status(500).json({ error: 'Failed to load student' });
	}
});

app.listen(PORT, () => {
	console.log(`Students API listening on port ${PORT}`);
});
