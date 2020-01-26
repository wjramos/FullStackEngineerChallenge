const express = require('express');
const bodyParser = require('body-parser');

const Employee = require('./models/Employee');
const Review = require('./models/Review');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @TODO when these requests get larger, they should be
// paginated with `.findAll().paginate({ limit, page })`
app.get('/employee', async (req, res) => {
  const employees = await Employee.findAll();

  return res.json(employees);
});

app.get('/employee/:employeeId', async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findAll({
    where: {
      id: employeeId,
    }
  });

  return res.json(employee[0]);
});

app.post('/employee', async (req, res) => {
  const employee = await Employee.create({ ...req.body });

  res.send(employee);
});

app.put('/employee', async (req, res) => {
  const { employeeId } = req.body;

  const [, affectedRows] = await Employee.update(
    { ...req.body },
    {
      where: {
        id: employeeId,
      },
      returning: true,
      plain: true,
    },
  );

  res.send(affectedRows[0]);
});

app.delete('/employee', async (req, res) => {
  const { employeeId } = req.body;

  const affectedRows = await Employee.destroy({
    where: {
      id: employeeId,
    },
  });

  console.warn(`${affectedRows} destroyed.`);

  res.send();
});

app.get('/employee/:employeeId', async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findAll({
    where: {
      id: employeeId,
    },
  });

  return res.json(employee);
});

app.get('/review', async (req, res) => {
  const { assignedId } = req.query;

  const reviews = await Review.findAll({
    where: {
      assignedId,
    },
  });

  return res.json(reviews);
});

app.get('/review/:employeeId', async (req, res) => {
  const { employeeId } = req.params;

  const reviews = await Review.findAll({
    where: {
      employeeId,
    },
  });

  return res.json(reviews);
});

app.post('/review', async (req, res) => {
  const review = await Review.create({ ...req.body });

  res.send(review);
});

app.put('/review', async (req, res) => {
  const { employeeId, assignedId } = req.body;

  const [, affectedRows] = await Review.update(
    { ...req.body },
    {
      where: {
        employeeId,
        assignedId,
      },
      returning: true,
      plain: true,
    },
  );

  res.send(affectedRows[0]);
});

module.exports = app;