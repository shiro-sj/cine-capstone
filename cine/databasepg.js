const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "123",
    database: "users" 
})

client.connect();

client.query('Select * from user_login', (err, res)=>{
    if(!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
})
