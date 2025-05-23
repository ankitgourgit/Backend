const {Client} = require("pg");

const dbConfig = {
    user:"greenstory",
    host:"localhost",
    database:"greenstory",
    password:"greenstory1234",
    port:5432
}

console.log(dbConfig);

const client = new Client(dbConfig);

// connect to postgressql server.....
const connectToDatabase = async()=>{
    try {
        await client.connect();
         console.log('Connected to the database');
        
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

module.exports = {
    client,
    connectToDatabase
};
