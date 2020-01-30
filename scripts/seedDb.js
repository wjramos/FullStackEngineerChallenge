const fs = require('fs');

const Employee = require('../server/models/Employee');
const Review = require('../server/models/Review');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
async function seed() {
  if (fs.existsSync('./database.sqlite3')) {
    console.info('Database exists, no need to seed');

    return;
  }

  // create tables
  await Employee.sync({ force: true });
  await Review.sync({ force: true });

  // insert data
  await Promise.all([
    // Employees
    Employee.create({
      firstName: 'Brett',
      lastName: 'Hellman',
      title: 'CEO',
    }),
    Employee.create({
      firstName: 'Matthew',
      lastName: 'Eernisse',
      title: 'CTO',
    }),
    Employee.create({
      firstName: 'Kerem',
      lastName: 'Kazan',
      title: 'Founding Engineer',
    }),
    Employee.create({
      firstName: 'Marc',
      lastName: 'Reisen',
      title: 'Founding Designer',
    }),

    // Reviews
    Review.create({
      employeeId: 1,
      assignedId: 2,
      feedback: null,
    }),

    Review.create({
      employeeId: 2,
      assignedId: 1,
      feedback: 'Excellent coworker, great attention to detail',
    }),

    Review.create({
      employeeId: 1,
      assignedId: 3,
      feedback: 'Best CEO ever!',
    }),
  ]);
}

seed();
