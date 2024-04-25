const express = require('express');
const app = express();
const { startDb, getConnectionStatus } = require('./db.js'); 
const {userModel} = require("./userschema.js")


var cors = require('cors');
app.use(cors());

const printStatus = async () => {
    await startDb(); 
    console.log("MongoDB Connection Status -> ", await getConnectionStatus());
}

printStatus();

app.get('/', (req, res) => {
    res.send('Server Deployed Successfully');
});

app.post('/signup',async (req,res)=>{
    try{
        const {username,password} = req.body


            const response = await userModel.create(user)
            res.status(200).send(response);
    }
    catch(err){
        console.log("Error in signing up user",err);
    }
})

app.post('/signin',async (req,res)=>{
    try{
            const {username,password} = req.body
            const response = await userModel.findOne({username,password})
            if(!response){
                res.status(500).send("invalid user credentials")
            }
            
            res.status(200).send(response)
    }
    catch(err){
        console.log("Login failed",err);
    }
})


const route = require('./routes.js');
app.use('/', route);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port', process.env.PORT || 3000);
});

module.exports = app;
