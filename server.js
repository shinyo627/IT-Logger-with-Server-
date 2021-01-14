const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the IT-logger' });
});

// Defined Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

// Will be used in production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
