const express = require('express');
const router = express.Router();
const { pool, poolConnect } = require('../db');

router.get('/students', async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request().query(`
      SELECT id, firstName, lastName, email, mobile, fees, status 
      FROM Students
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server error');
  }
});

router.post('/students', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, fees, status } = req.body;

    console.log('Received POST data:', req.body);
    
    await poolConnect;

    await pool.request()
      .input('firstName', firstName)
      .input('lastName', lastName)
      .input('email', email)
      .input('mobile', mobile)
      .input('fees', fees)
      .input('status', status)
      .query(`
        INSERT INTO Students (firstName, lastName, email, mobile, fees, status)
        VALUES (@firstName, @lastName, @email, @mobile, @fees, @status)
      `);

    res.send({ message: 'Student added' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server error');
  }
});

router.put('/students/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, fees, status } = req.body;
    const { id } = req.params;
    await poolConnect;

    await pool.request()
      .input('id', id)
      .input('firstName', firstName)
      .input('lastName', lastName)
      .input('email', email)
      .input('mobile', mobile)
      .input('fees', fees)
      .input('status', status)
      .query(`
        UPDATE Students
        SET firstName = @firstName,
            lastName = @lastName,
            email = @email,
            mobile = @mobile,
            fees = @fees,
            status = @status
        WHERE id = @id
      `);

    res.send({ message: 'Student updated' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server error');
  }
});

router.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await poolConnect;

    await pool.request()
      .input('id', id)
      .query('DELETE FROM Students WHERE id = @id');

    res.send({ message: 'Student deleted' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
