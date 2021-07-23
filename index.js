const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");




// dotenv.config();

app.use(express.json());

mongoose 
 .connect("mongodb+srv://salik:123@cluster0.urtqj.mongodb.net/MAPTAG?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

if(process.env.NODE_ENV == 'production')
{
    app.use(express.static('frontend/build'));
    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    });
}

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log("Backend server is running!");
});
