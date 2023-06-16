import pg from 'pg'

const{ Pool, Client } = pg;
const connectionString = 'postgresql://node_user:node@localhost:5432/practica_db';

const pool = new Pool({connectionString});
pool.query('SELECT now()', (err, res) => {
    console.log(err,res);
    pool.end()
})

const client = new Client({connectionString});
// client.connect()  -->linea de paloma
client.query('select now()', (err, res)=>{
    console.log(err, res);
    client.end();
});