const express = require('express')
const { Pool } = require('pg');
var cors = require('cors');
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser');
const app = express()
app.use(cors());

app.get('/',(req, res) => { 
      res.status(200).send("HI , i am the home page , made by landry")
})


pool = new Pool({
  user: 'postgres',
  host: 'db',
  password: 'root'
})
pool.connect((err, client, done) => {
  if (err) {
      console.error('Error connecting to PostgreSQL:', err);
  } else {
      console.log('Connected to PostgreSQL database');
  }
  done();
});



app.get('/commandes',(req, res) => { 
  pool.query(' SELECT * FROM commandes').then((result) => {
    res.status(200).send(result.rows)

  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Error executing query');
  });
})

app.get('/home',(req, res) => { 
  pool.query(' SELECT * FROM products').then((result) => {
    res.status(200).send(result.rows)

  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Error executing query');
  });
})

app.get('/TodayLoanData',(req, res) => { 
  pool.query(' SELECT * FROM loan_today').then((result) => {
    res.status(200).send(result.rows)

  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Error executing query');
  });
})


app.listen(PORT, () => {
  console.log('server is listening on port: ',PORT)
})