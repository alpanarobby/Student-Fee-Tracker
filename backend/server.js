const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoutes'); 

app.use(cors());
app.use(express.json());

app.use('/api', studentRoutes); 

app.get('/test', (req, res) => {
  res.send('Test route working');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
