const parties = require('./routes/parties');
const sql = require('mssql');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/parties', parties);

app.get('/', (request, response) => {
    response.send(`<h1>Welcome to Open Banking API</h1>
                    <br>
                    <h3>Parties ~ API</h3>
                    <p>/api/parties ~ GET</p>
                    <p>/api/parties/id ~ GET BY Id</p>`);
});

try {
    sql.connect('mssql://OpenBankingAdmin:Password@123@open-banking-server.database.windows.net/DemoBankDB').then((dbConn) => {
        console.log('SQL connected...');
        console.log('Database connected: ', dbConn._connected);
    }).catch(err => {
        console.log(err);
    })
    sql.on('error', err => {
        console.log(err);
    });
} catch (error) {
    console.log(error);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));