const express = require('express');
const app = express();
const { startDb, getConnectionStatus } = require('./db.js'); 


var cors = require('cors');
app.use(cors());

const printStatus = async () => {
    await startDb(); 
    console.log("MongoDB Connection Status -> ", await getConnectionStatus());
}

printStatus();

const route = require('./routes.js');
app.use('/', route);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port', process.env.PORT || 3000);
});

module.exports = app;

