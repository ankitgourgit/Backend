const express = require("express");
const {client ,connectToDatabase } = require("./db/index")

connectToDatabase(); 

const app = express();
const PORT = 3000;

app.use(express.json());

  async function createAlbumsTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS albums (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          artist VARCHAR(255) NOT NULL,
          price NUMERIC(10, 2)
        );
      `;
  
      await client.query(query);
      console.log('Albums table created');
    } catch (err) {
      console.error(err);
      console.error('Albums table creation failed');
    }
  }
  
  createAlbumsTable();

//add in table
  app.post('/albums', async (req, res) => {
    // Validate the incoming JSON data
    const { title, artist, price } = req.body;
    console.log(req.body);
    if (!title || !artist || !price) {
      return res.status(400).send('One of the title, or artist, or price is missing in the data');
    }
  
    try {
      // try to send data to the database
      const query = `
        INSERT INTO albums (title, artist, price)
        VALUES ($1, $2, $3)
        RETURNING id;
      `;
      const values = [title, artist, price];
  
      const result = await client.query(query, values);
      res.status(201).send({ message: 'New Album created', albumId: result.rows[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).send('some error has occured');
    }
  });

//get 
app.get('/albums', async (req, res) => {
    try {
      const query = 'SELECT * FROM albums;';
      const { rows } = await client.query(query);
      res.status(200).json(rows);
      console.log(rows)
    } catch (err) {
      console.error(err);
      res.status(500).send('failed');
    }
  });

//server

app.listen(PORT,(error)=>{
    if(error) console.log(error);
    else console.log(`server is sucessfully running and app is listing on port ${PORT}`);
})