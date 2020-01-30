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
  try {
    const employees = await Employee.findAll();

    return res.json(employees);
  } catch(e) {
    res.end(404).send('No employees found');
  }
});

app.get('/employee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({
      where: { id },
    });

    return res.json(employee);
  } catch(e) {
    res.end(404).send('No employee found');
  }
});

app.put('/employee', async (req, res) => {
  const { id } = req.body;

  try {
    let employee;

    if (id) {
      // Update
      await Employee.upsert(
        req.body,
        { where: { id } },
      );

      employee = await Employee.findOne({
        where: { id },
      });
    } else {
      // Insert
      employee = await Employee.create(req.body);
    }

    res.json(employee);
  } catch(e) {
    res.end(404).send('No employee found');
  }
});

app.delete('/employee', async (req, res) => {
  const { employeeId: id } = req.body;

  try {
    await Employee.destroy({
      where: { id },
    });

    res.json({});
  } catch(e) {
    res.end(404).send('No employee found');
  }
});

app.get('/employee/:employeeId', async (req, res) => {
  const { employeeId: id } = req.params;

  try {
    const employee = await Employee.findOne({
      where: { id },
    });

    return res.json(employee);
  } catch(e) {
    res.end(404).send('No employee found');
  }
});

app.get('/review', async (req, res) => {
  const { assignedId } = req.query;

  try {
    const reviews = await Review.findAll({
      where: { assignedId },
    });

    return res.json(reviews);
  } catch(e) {
    res.end(404).send('No reviews found');
  }
});

app.get('/review/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  const { assignedId } = req.query;

  try {
    const reviews = await Review.findAll({
      where: {
        employeeId,
        ...(assignedId ? { assignedId } : {}),
      },
    });

    return res.json(reviews);
  } catch (e) {
    res.end(404).send('No reviews found');
  }
});

app.patch('/review', async (req, res) => {
  const { employeeId, assignedId } = req.body;

  try {
    await Review.update(
      req.body,
      {
        where: { employeeId, assignedId },
      },
    );

    const { dataValues: review } = await Review.findOne({
      where: { employeeId, assignedId },
    });

    res.send(review);
  } catch (e) {
    res.end(404).send('No reviews found');
  }
});

module.exports = app;