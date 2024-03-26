const express = require('express');
require('dotenv').config();
const app = express();

app.get('/',(req,res)=>{
    res.send('Server deployed')
})

app.listen(process.env.PORT, ()=>{
 console.log('success')
})

module.exports = app;