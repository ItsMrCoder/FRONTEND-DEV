// =====================================================
// STEP 1: Find things on the page
// =====================================================
const studentTableBody = document.querySelector('#studentTableBody');
const totalStudents = document.querySelector('#totalStudents');
const averageScore = document.querySelector('#averageScore');
const highestScore = document.querySelector('#highestScore');
const lowestScore = document.querySelector('#lowestScore');
const searchInput = document.querySelector('#searchInput');
const addStudentBtn = document.querySelector('#addStudentBtn');
const studentModal = document.querySelector('#studentModal');
const closeModal = document.querySelector('#closeModal');
const studentForm = document.querySelector('#studentForm');
const studentName = document.querySelector('#studentName');
const studentEmail = document.querySelector('#studentEmail');
const studentDepartment = document.querySelector('#studentDepartment');
const studentScore = document.querySelector('#studentScore');


// =====================================================
// STEP 2: Get saved students from the browser's notebook
// =====================================================
let students = [];

try {
    students = JSON.parse(localStorage.getItem('students')) || [];
} catch (error) {
    students = []; // if the notebook is spoiled, start fresh
}

// NEW: This remembers which student we are editing.
// null means "we are not editing anybody, we are adding a new student".
let editingId = null;


// =====================================================
// STEP 3: Turn a score into a grade letter
// =====================================================
function calculateScore(score) {
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    if (score >= 45) return 'D';
    if (score >= 40) return 'E';
    return 'F';
}


// =====================================================
// STEP 4: Show students in the table
// =====================================================
function displayStudents(studentsList) {
    // Wipe the table clean first (so rows do not repeat)
    studentTableBody.innerHTML = '';

    studentsList.forEach(student => {
        const row = document.createElement('tr');

        // The normal columns
        const values = [
            student.id,
            student.name,
            student.email,
            student.department,
            student.score,
            calculateScore(student.score)
        ];

        values.forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value; // safe: shows text only
            row.append(cell);
        });

        // NEW: One more cell for the Edit and Delete buttons
        const actionsCell = document.createElement('td');

        // ----- Edit button -----
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            startEditing(student.id); // when clicked, start editing this student
        });

        // ----- Delete button -----
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteStudent(student.id); // when clicked, delete this student
        });

        actionsCell.append(editBtn, deleteBtn);
        row.append(actionsCell);

        studentTableBody.append(row);
    });
}


// =====================================================
// STEP 5: Update the numbers at the top
// =====================================================
function updateStat() {
    totalStudents.textContent = students.length;

    // No students? Show zeros and stop.
    if (students.length === 0) {
        averageScore.textContent = '0.00';
        highestScore.textContent = '0';
        lowestScore.textContent = '0';
        return;
    }

    const scores = students.map(student => student.score);
    const total = scores.reduce((sum, score) => sum + score, 0);

    averageScore.textContent = (total / students.length).toFixed(2);
    highestScore.textContent = Math.max(...scores);
    lowestScore.textContent = Math.min(...scores);
}


// =====================================================
// STEP 6: Save students in the browser's notebook
// =====================================================
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}


// =====================================================
// NEW - STEP 7: Refresh the table
// We use this after add, edit and delete.
// It also respects the search box, so if the person
// searched "john", the table still shows only "john".
// =====================================================
function refreshTable() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.department.toLowerCase().includes(searchText)
    );

    displayStudents(filtered);
    updateStat();
}


// =====================================================
// STEP 8: Open and close the popup
// =====================================================
function closeStudentModal() {
    studentModal.style.display = 'none'; // hide the popup
    studentForm.reset();                 // clear the form
    editingId = null;                    // we are no longer editing anybody
}

addStudentBtn.addEventListener('click', () => {
    editingId = null;                    // this is a NEW student, not an edit
    studentForm.reset();                 // make sure the form is empty
    studentModal.style.display = 'flex'; // show the popup
});

closeModal.addEventListener('click', closeStudentModal);


// =====================================================
// NEW - STEP 9: Start editing a student
// =====================================================
function startEditing(id) {
    // Find the student that has this id
    const student = students.find(s => s.id === id);

    // If we could not find the student, stop
    if (!student) return;

    // Remember who we are editing
    editingId = id;

    // Put the old details inside the form fields
    studentName.value = student.name;
    studentEmail.value = student.email;
    studentDepartment.value = student.department;
    studentScore.value = student.score;

    // Show the popup
    studentModal.style.display = 'flex';
}


// =====================================================
// NEW - STEP 10: Delete a student
// =====================================================
function deleteStudent(id) {
    // Ask first, so nobody deletes by mistake
    const sure = confirm('Are you sure you want to delete this student?');

    // If the person clicked Cancel, stop here
    if (!sure) return;

    // Keep every student EXCEPT the one with this id
    students = students.filter(student => student.id !== id);

    saveStudents();  // save the new list
    refreshTable();  // redraw the table and numbers
}


// =====================================================
// STEP 11: What happens when the form is submitted
// This now handles BOTH adding and editing.
// =====================================================
studentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the page from refreshing

    const name = studentName.value.trim();
    const email = studentEmail.value.trim();
    const department = studentDepartment.value.trim();
    const score = Number(studentScore.value.trim());

    // CHECK 1: no field should be empty
    if (!name || !email || !department) {
        alert('Please fill in all fields.');
        return;
    }

    // CHECK 2: score must be a number from 0 to 100
    if (Number.isNaN(score) || score < 0 || score > 100) {
        alert('Score must be a number between 0 and 100.');
        return;
    }

    if (editingId !== null) {
        // ----- WE ARE EDITING -----
        // Find the old student and change his details.
        // We do NOT change the id.
        const student = students.find(s => s.id === editingId);

        if (student) {
            student.name = name;
            student.email = email;
            student.department = department;
            student.score = score;
        }
    } else {
        // ----- WE ARE ADDING A NEW STUDENT -----
        const newStudent = {
            id: Date.now(),
            name,
            email,
            department,
            score
        };
        students.push(newStudent);
    }

    saveStudents();      // save in the notebook
    refreshTable();      // redraw the table and numbers
    closeStudentModal(); // close the popup, clear the form, forget the edit
});


// =====================================================
// STEP 12: Search
// Every time the person types, we redraw the table.
// =====================================================
searchInput.addEventListener('input', refreshTable);


// =====================================================
// STEP 13: Start the page
// =====================================================
refreshTable();