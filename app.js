const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT,(error)=>{
    if(error) console.log(error);
    else console.log(`server is sucessfully running and app is listing on port ${PORT}`);
})