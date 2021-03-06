const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const dataBase = require("./config/database");
const fileupload = require('express-fileupload'); 





/**
 * -------------- GENERAL SETUP ----------------
 */
 const app = express();


/**
 * 
 * This route is for testing
 * 
 */
 app.get('/', (req, res) => {

  res.send("Hello from home")
})

const PORT = process.env.PORT || 8008;



const clientRoutes = require("./users/userRoutes");
const providerRoutes = require("./providers/providerRoutes");
const statusRoutes = require("./status/statusRoutes");






app.use(fileupload({useTempFiles: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/**
 * -------------- ROUTES ----------------
 */
app.use("/api/mobile/users", clientRoutes);
app.use("/api/mobile/provider", providerRoutes);
app.use("/api/mobile/status", statusRoutes);



































/**
 * 
 * Data Base Configration
 *  
 */
var  mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  serverSelectionTimeoutMS: 5000, //Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
} 
mongoose.connect(dataBase.dataBaseUrl, mongooseOptions , (err) => {
  if(err){
    console.log(err);
  }else{
    console.log('DATABASE CONNECTION ===> Connected');
  }
})

app.listen(PORT, () => {
  console.log(`listenting on port ..${PORT}`);
});
