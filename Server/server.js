const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('Server deployed')
})

app.listen(PORT , ()=>{
 console.log('success')
})

module.exports = app;