const Employee = require('../server/models/Employee');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
async function seed() {
  // create table
  await Employee.sync({ force: true });

  // insert data
  await Promise.all([
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
  ]);
}

seed();
