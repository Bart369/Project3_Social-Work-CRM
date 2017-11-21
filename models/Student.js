const db = require('../db/config');

const Student = {};

Student.findAll = () => {
    return db.manyOrNone('SELECT * FROM students');
  }

//should this be email and not id?
Student.findbyEmail = (email) => {
    return db.oneOrNone(`
        SELECT * FROM students
        WHERE email = $1
    `, [email]);
};

// TO DO - Update create model method below with password field when auth routes are done

//this was email i changed it to student
Student.create = (student) => {
    return db.one(`
        INSERT INTO students
        (email, first_name, last_name, phone, cycle, aboutme)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [student.email, student.first_name, student.last_name, student.phone, student.cycle, student.aboutme]);
};

Student.update = (student, email) => {
  return db.one(`
    UPDATE students SET
    phone = $1,
    aboutme = $2
    WHERE email = $3
    RETURNING *
  `,[student.phone, student.aboutme], email);
};

Student.destroy = (email) => {
  return db.none('DELETE FROM students WHERE id = $1', email);
};

module.exports = Student;
